"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGate({ redirectTo, cookieName }: { redirectTo: string; cookieName: string }) {
  const router = useRouter();
  useEffect(() => {
    const hasCookie = document.cookie.split("; ").some((row) => row.startsWith(`${cookieName}=`));
    if (!hasCookie) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo, cookieName]);
  return null;
}