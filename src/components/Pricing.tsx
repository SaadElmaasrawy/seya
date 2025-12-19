'use client';

import { useState } from 'react';
import PaymentButton from './PaymentButton';
import { useLanguage } from "@/context/LanguageContext";

interface PricingProps {
  user: {
    email: string;
    name: string;
    phone_number?: string;
    [key: string]: any;
  };
  userId: string;
  onClose?: () => void;
}

export default function Pricing({ user, userId, onClose }: PricingProps) {
  const userName = user?.name || 'User';
  const nameParts = userName.split(' ');
  const { t } = useLanguage();

  const billingData = {
    first_name: nameParts[0] || 'User',
    last_name: nameParts.slice(1).join(' ') || 'Name',
    email: user?.email || 'user@example.com',
    phone_number: user?.phone_number || '01000000000',
    apartment: 'NA',
    floor: 'NA',
    street: 'NA',
    building: 'NA',
    shipping_method: 'PKG',
    postal_code: 'NA',
    city: 'NA',
    country: 'NA',
    state: 'NA',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 max-w-4xl w-full overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{t("Upgrade Your Plan")}</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Free Plan */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{t("Free Plan")}</h3>
              <p className="text-gray-400 text-sm">{t("Perfect for trying out Seya")}</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">{t("0 EGP")}</span>
              <span className="text-gray-500 ml-2">{t("/ month")}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t("50 AI Messages / Month")}
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t("Basic Support")}
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-white/20 text-white font-medium cursor-not-allowed opacity-50" disabled>
              {t("Current Plan")}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 bg-gradient-to-b from-indigo-900/20 to-transparent flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              {t("RECOMMENDED")}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{t("Pro Plan")}</h3>
              <p className="text-gray-400 text-sm">{t("Unleash your full potential")}</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">{t("500 EGP")}</span>
              <span className="text-gray-500 ml-2">{t("/ month")}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <strong>{t("Unlimited")}</strong> {t("AI Messages")}
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t("Priority Support")}
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t("Access to New Features")}
              </li>
            </ul>

            <PaymentButton
              amount={500}
              currency="EGP"
              billingData={billingData}
              paymentMethod="card"
              userId={userId}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-900/50"
            >
              {t("Upgrade to Pro")}
            </PaymentButton>
          </div>
        </div>
      </div>
    </div>
  );
}
