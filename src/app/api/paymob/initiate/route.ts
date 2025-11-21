import { NextRequest, NextResponse } from 'next/server';
import { authenticate, registerOrder, getPaymentKey, getIframeUrl } from '@/lib/paymob';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, currency, billingData, items, paymentMethod = 'card', userId } = body;

        if (!amount || !currency || !billingData) {
            return NextResponse.json(
                { error: 'Missing required fields: amount, currency, billingData' },
                { status: 400 }
            );
        }

        let integrationId = process.env.PAYMOB_CARD_INTEGRATION_ID;
        let iframeId = process.env.PAYMOB_IFRAME_ID;

        if (paymentMethod === 'wallet') {
            integrationId = process.env.PAYMOB_WALLET_INTEGRATION_ID;
            iframeId = process.env.PAYMOB_WALLET_IFRAME_ID || iframeId; // Use wallet specific or fallback
        }

        // Fallback for backward compatibility if user hasn't updated env vars yet
        if (!integrationId) {
            integrationId = process.env.PAYMOB_INTEGRATION_ID;
        }

        if (!integrationId) {
            return NextResponse.json({ error: 'Integration ID not configured' }, { status: 500 });
        }

        // 1. Authenticate
        const token = await authenticate();

        // 2. Register Order
        // Amount must be in cents
        const amountCents = Math.round(amount * 100);

        // Use userId in merchant_order_id to identify user in callback
        // Format: userId_timestamp
        const merchantOrderId = userId ? `${userId}_${Date.now()}` : undefined;

        const orderId = await registerOrder(token, amountCents, currency, merchantOrderId, items);

        // 3. Get Payment Key
        // Ensure billing data has all required fields, fill with defaults if missing
        const completeBillingData = {
            apartment: 'NA',
            email: 'NA',
            floor: 'NA',
            first_name: 'NA',
            street: 'NA',
            building: 'NA',
            phone_number: 'NA',
            shipping_method: 'NA',
            postal_code: 'NA',
            city: 'NA',
            country: 'NA',
            last_name: 'NA',
            state: 'NA',
            ...billingData,
        };

        const paymentKey = await getPaymentKey(
            token,
            orderId,
            amountCents,
            currency,
            completeBillingData,
            integrationId
        );

        // 4. Get Iframe URL (or Redirect URL for wallets)
        let redirectUrl = getIframeUrl(paymentKey);
        if (paymentMethod === 'wallet' && process.env.PAYMOB_WALLET_IFRAME_ID) {
            redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_WALLET_IFRAME_ID}?payment_token=${paymentKey}`;
        }

        return NextResponse.json({ iframeUrl: redirectUrl });
    } catch (error: any) {
        console.error('Paymob Initiation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to initiate payment' },
            { status: 500 }
        );
    }
}
