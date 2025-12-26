'use client';

import PaymentButton from '@/components/PaymentButton';

export default function TestPaymentPage() {
    const dummyBillingData = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone_number: '01000000000',
        apartment: '1',
        floor: '1',
        street: 'Test Street',
        building: '1',
        shipping_method: 'PKG',
        postal_code: '12345',
        city: 'Cairo',
        country: 'EG',
        state: 'Cairo',
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Paymob Integration Test</h1>

                <div className="mb-6 text-left text-sm text-gray-600 bg-gray-100 p-4 rounded">
                    <p className="font-semibold mb-2">Test Details:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Amount: <strong>100.00 EGP</strong></li>
                        <li>Currency: <strong>EGP</strong></li>
                        <li>User: <strong>Test User</strong></li>
                    </ul>
                </div>

                <div className="space-y-4 w-full">
                    <PaymentButton
                        amount={100}
                        currency="EGP"
                        billingData={dummyBillingData}
                        paymentMethod="card"
                        className="w-full py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Pay with Card (100 EGP)
                    </PaymentButton>

                    <PaymentButton
                        amount={100}
                        currency="EGP"
                        billingData={dummyBillingData}
                        paymentMethod="wallet"
                        className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-colors"
                    >
                        Pay with Wallet (100 EGP)
                    </PaymentButton>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                    Ensure your .env.local has valid Paymob credentials before clicking.
                </p>
            </div>
        </div>
    );
}
