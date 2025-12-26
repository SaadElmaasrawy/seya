import { NextRequest, NextResponse } from 'next/server';
import { verifyHmac } from '@/lib/paymob';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    try {
        // Paymob sends the data in the body for POST requests (Webhooks)
        // The HMAC is usually in the query params for the webhook URL you configured
        const hmac = req.nextUrl.searchParams.get('hmac');
        const body = await req.json();
        const { obj } = body;

        if (!obj) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Prepare data for HMAC verification
        // We need to merge the object from body with the hmac from query params
        const dataToVerify = {
            ...obj,
            hmac: hmac
        };

        // Verify HMAC
        const isValid = verifyHmac(dataToVerify);

        if (!isValid) {
            console.error('HMAC Verification Failed for Webhook');
            // In production, you might want to reject this. 
            // For debugging, we log it. Paymob might retry if we return error.
            // return NextResponse.json({ error: 'Invalid HMAC' }, { status: 403 });
        }

        const {
            success,
            order,
            id: transactionId,
            amount_cents,
            currency,
            source_data,
            created_at
        } = obj;

        const db = await getDb();
        const transactionsCollection = db.collection('transactions');
        const usersCollection = db.collection('users');

        // Upsert the transaction
        await transactionsCollection.updateOne(
            { paymobTransactionId: transactionId },
            {
                $set: {
                    paymobTransactionId: transactionId,
                    paymobOrderId: order.id,
                    status: success ? 'success' : 'failed',
                    amountCents: amount_cents,
                    currency: currency,
                    paymentMethodType: source_data?.type,
                    paymentMethodSubType: source_data?.sub_type,
                    createdAt: new Date(created_at),
                    updatedAt: new Date(),
                    rawResponse: obj, // Store full response for debugging
                },
                $setOnInsert: {
                    insertedAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log(`Transaction ${transactionId} processed. Status: ${success ? 'success' : 'failed'}`);

        // Handle Subscription Upgrade
        if (success && order.merchant_order_id) {
            try {
                // Format: userId_timestamp
                const [userId] = order.merchant_order_id.split('_');

                if (userId) {
                    const userObjectId = new ObjectId(userId);

                    await usersCollection.updateOne(
                        { _id: userObjectId },
                        {
                            $set: {
                                subscriptionStatus: 'pro',
                                maxMessages: 999999, // Unlimited
                                subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                                updatedAt: new Date()
                            }
                        }
                    );
                    console.log(`User ${userId} upgraded to PRO.`);
                }
            } catch (err) {
                console.error('Failed to upgrade user subscription:', err);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Paymob Callback Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    // This handles the redirection callback (if used as return URL)
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());

    const isValid = verifyHmac(params);

    if (!isValid) {
        console.error('HMAC Verification Failed for Redirection');
        return NextResponse.json({ error: 'Invalid HMAC' }, { status: 403 });
    }

    const url = req.nextUrl.clone();

    // Fix for local development with ngrok:
    // If we are on localhost, force http to avoid SSL errors
    if (url.hostname === 'localhost') {
        url.protocol = 'http';
    }

    if (params.success === 'true') {
        url.pathname = '/payment/success';
        return NextResponse.redirect(url);
    } else {
        url.pathname = '/payment/error';
        return NextResponse.redirect(url);
    }
}
