import crypto from 'crypto';

const PAYMOB_SECRET_KEY = process.env.PAYMOB_SECRET_KEY;
// const PAYMOB_PUBLIC_KEY = process.env.PAYMOB_PUBLIC_KEY;
const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET;

// const BASE_URL = 'https://accept.paymob.com/api';
const FLASH_API_URL = 'https://accept.paymob.com/v1/intention/';

interface BillingData {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    [key: string]: string | undefined;
}


import fs from 'fs';
import path from 'path';

function logDebug(message: string, data?: unknown) {
    const logPath = path.join(process.cwd(), 'paymob-debug.log');
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n${data ? JSON.stringify(data, null, 2) : ''}\n----------------------------------------\n`;
    try {
        fs.appendFileSync(logPath, logEntry);
    } catch (e) {
        console.error("Failed to write to log file", e);
    }
}

export async function createIntention(
    amount: number,
    currency: string,
    billingData: BillingData,
    items: unknown[] = [],
    paymentMethods: string[] = ['card', 'wallet'] // Default methods
): Promise<unknown> {
    logDebug('Starting createIntention', { amount, currency, paymentMethods });

    if (!PAYMOB_SECRET_KEY) {
        logDebug('Error: PAYMOB_SECRET_KEY is not defined');
        throw new Error('PAYMOB_SECRET_KEY is not defined');
    }

    // Construct the payload for the Intention API
    const payload = {
        amount: amount, // Amount is already in cents
        currency: currency,
        payment_methods: paymentMethods,
        billing_data: {
            first_name: billingData.first_name || 'NA',
            last_name: billingData.last_name || 'NA',
            phone_number: billingData.phone_number || 'NA',
            email: billingData.email || 'NA',
            // Add other required fields with defaults
            apartment: 'NA',
            floor: 'NA',
            street: 'NA',
            building: 'NA',
            shipping_method: 'NA',
            postal_code: 'NA',
            city: 'NA',
            country: 'NA',
            state: 'NA',
        },
        items: items,
        // extras: { ... } // Optional extras
    };

    logDebug('Sending request to Paymob', { url: FLASH_API_URL, payload });

    try {
        const response = await fetch(FLASH_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${PAYMOB_SECRET_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();
        logDebug('Received response from Paymob', { status: response.status, statusText: response.statusText, body: responseText });

        if (!response.ok) {
            throw new Error(`Paymob Intention Creation Failed: ${response.status} ${responseText}`);
        }

        const data = JSON.parse(responseText);
        return data;
    } catch (error) {
        logDebug('Error creating payment intention', error);
        console.error('Error creating payment intention:', error);
        throw error;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyHmac(queryParams: Record<string, any>): boolean {
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

    return calculatedHmac === hmac;
}
