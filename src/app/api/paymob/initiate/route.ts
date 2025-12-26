import { NextRequest, NextResponse } from 'next/server';
import { createIntention } from '@/lib/paymob';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, currency, billingData, items, paymentMethod = 'card' } = body;

        if (!amount || !currency || !billingData) {
            return NextResponse.json(
                { error: 'Missing required fields: amount, currency, billingData' },
                { status: 400 }
            );
        }

        // Map legacy paymentMethod to Paymob's expected format if needed
        // For Unified Intention, we might send a list of allowed methods
        const paymentMethods = paymentMethod === 'wallet' ? ['wallet', 'card'] : ['card', 'wallet'];

        const intentionData = await createIntention(
            amount,
            currency,
            billingData,
            items,
            paymentMethods
        );

        return NextResponse.json(intentionData);
    } catch (error: unknown) {
        const err = error as Error;
        console.error('Paymob Initiation Error:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to initiate payment' },
            { status: 500 }
        );
    }
}
