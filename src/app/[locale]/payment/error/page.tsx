import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function PaymentErrorPage() {
    const t = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">{t("payment_error_title")}</h1>
                <p className="text-gray-700">{t("payment_error_message")}</p>
                <Link href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {t("return_to_home")}
                </Link>
            </div>
        </div>
    );
}
