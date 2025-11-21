import crypto from 'crypto';

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;
const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET;

const BASE_URL = 'https://accept.paymob.com/api';

interface PaymobAuthResponse {
    token: string;
    profile: any;
}

interface PaymobOrderResponse {
    id: number;
    created_at: string;
    delivery_needed: boolean;
    merchant: any;
    collector: any;
    amount_cents: number;
    shipping_data: any;
    currency: string;
    is_payment_locked: boolean;
    is_return: boolean;
    is_cancel: boolean;
    is_returned: boolean;
    is_canceled: boolean;
    merchant_order_id: string;
    wallet_notification: any;
    paid_amount_cents: number;
    notify_user_with_email: boolean;
    items: any[];
    order_url: string;
    commission_fees: number;
    delivery_fees_cents: number;
    delivery_vat_cents: number;
    payment_method: string;
    merchant_staff_tag: any;
    api_source: string;
    data: any;
}

interface PaymobKeyResponse {
    token: string;
}

export async function authenticate(): Promise<string> {
    if (!PAYMOB_API_KEY) {
        throw new Error('PAYMOB_API_KEY is not defined');
    }

    const response = await fetch(`${BASE_URL}/auth/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: PAYMOB_API_KEY,
        }),
    });

    if (!response.ok) {
        throw new Error(`Paymob Authentication Failed: ${response.statusText}`);
    }

    const data: PaymobAuthResponse = await response.json();
    return data.token;
}

export async function registerOrder(
    authToken: string,
    amountCents: number,
    currency: string,
    merchantOrderId?: string,
    items: any[] = []
): Promise<number> {
    const response = await fetch(`${BASE_URL}/ecommerce/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auth_token: authToken,
            delivery_needed: 'false',
            amount_cents: amountCents.toString(),
            currency: currency,
            merchant_order_id: merchantOrderId, // Optional: unique ID from your system
            items: items,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Paymob Order Registration Failed: ${error}`);
    }

    const data: PaymobOrderResponse = await response.json();
    return data.id;
}

export async function getPaymentKey(
    authToken: string,
    orderId: number,
    amountCents: number,
    currency: string,
    billingData: any,
    integrationId: string
): Promise<string> {
    if (!integrationId) {
        throw new Error('integrationId is required');
    }

    const response = await fetch(`${BASE_URL}/acceptance/payment_keys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auth_token: authToken,
            amount_cents: amountCents.toString(),
            expiration: 3600, // 1 hour
            order_id: orderId,
            billing_data: billingData,
            currency: currency,
            integration_id: integrationId,
            lock_order_when_paid: 'false',
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Paymob Payment Key Request Failed: ${error}`);
    }

    const data: PaymobKeyResponse = await response.json();
    return data.token;
}

export function getIframeUrl(paymentToken: string): string {
    if (!PAYMOB_IFRAME_ID) {
        throw new Error('PAYMOB_IFRAME_ID is not defined');
    }
    return `${BASE_URL}/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
}

export function verifyHmac(queryParams: any): boolean {
    if (!PAYMOB_HMAC_SECRET) {
        console.error('PAYMOB_HMAC_SECRET is not defined');
        return false;
    }

    const {
        amount_cents,
        created_at,
        currency,
        error_occured,
        has_parent_transaction,
        id,
        integration_id,
        is_3d_secure,
        is_auth,
        is_capture,
        is_refunded,
        is_standalone_payment,
        is_voided,
        order,
        owner,
        pending,
        success,
        hmac
    } = queryParams;

    // Handle nested objects (for Webhook POST requests) vs flat values (for Redirect GET requests)
    const orderId = typeof order === 'object' && order !== null ? order.id : order;
    const ownerId = typeof owner === 'object' && owner !== null ? owner.id : owner;

    // Handle source_data which can be nested (POST) or flat with dots (GET)
    const source_data_pan = queryParams['source_data.pan'] || queryParams.source_data?.pan;
    const source_data_sub_type = queryParams['source_data.sub_type'] || queryParams.source_data?.sub_type;
    const source_data_type = queryParams['source_data.type'] || queryParams.source_data?.type;

    // Extract values in the exact order specified by Paymob documentation
    // Note: The order of keys is critical for HMAC calculation
    const data = [
        amount_cents,
        created_at,
        currency,
        error_occured,
        has_parent_transaction,
        id,
        integration_id,
        is_3d_secure,
        is_auth,
        is_capture,
        is_refunded,
        is_standalone_payment,
        is_voided,
        orderId,
        ownerId,
        pending,
        source_data_pan,
        source_data_sub_type,
        source_data_type,
        success,
    ].join('');

    const calculatedHmac = crypto
        .createHmac('sha512', PAYMOB_HMAC_SECRET)
        .update(data)
        .digest('hex');

    console.log('--- HMAC Debug ---');
    console.log('Data String:', data);
    console.log('Calculated:', calculatedHmac);
    console.log('Received:', hmac);
    console.log('Secret (first 4):', PAYMOB_HMAC_SECRET.substring(0, 4));
    console.log('------------------');

    return calculatedHmac === hmac;
}
