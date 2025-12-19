import { NextRequest, NextResponse } from 'next/server';
import { createIntention } from '@/lib/paymob';

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
    } catch (error: any) {
        console.error('Paymob Initiation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to initiate payment' },
            { status: 500 }
        );
    }
}
