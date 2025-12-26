'use client';

import { useState } from 'react';
import { useTranslations } from "next-intl";

interface PaymentButtonProps {
    amount: number;
    currency: string;
    billingData: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        [key: string]: string | number | boolean | undefined;
    };
    items?: unknown[];
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
    const t = useTranslations();

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

            if (data.client_secret) {
                // Redirect to Unified Checkout
                const publicKey = process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY;
                if (!publicKey) {
                    console.error('NEXT_PUBLIC_PAYMOB_PUBLIC_KEY is not defined');
                    alert(t('Payment configuration error. Please contact support.'));
                    return;
                }
                window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${data.client_secret}`;
            } else if (data.iframeUrl) {
                // Fallback for legacy iframe
                window.location.href = data.iframeUrl;
            } else if (data.redirection_url) {
                // Direct redirection
                window.location.href = data.redirection_url;
            } else {
                console.error('Payment initiation failed:', data);
                alert(t('Payment initiation failed. Please try again.'));
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert(t('An error occurred. Please try again.'));
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
            {loading ? t('Processing...') : children || t('Pay Now')}
        </button>
    );
}
