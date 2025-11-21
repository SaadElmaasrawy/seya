'use client';

import { useState } from 'react';

interface PaymentButtonProps {
    amount: number;
    currency: string;
    billingData: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        [key: string]: any;
    };
    items?: any[];
    paymentMethod?: 'card' | 'wallet';
    userId?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function PaymentButton({
    amount,
    currency,
    billingData,
    items = [],
    paymentMethod = 'card',
    userId,
    className = '',
    children,
}: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/paymob/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    billingData,
                    items,
                    paymentMethod,
                    userId,
                }),
            });

            const data = await response.json();

            if (data.iframeUrl) {
                window.location.href = data.iframeUrl;
            } else {
                console.error('Payment initiation failed:', data.error);
                alert('Payment initiation failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
        >
            {loading ? 'Processing...' : children || 'Pay Now'}
        </button>
    );
}
