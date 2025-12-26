export async function sendVerificationEmail(email: string, token: string) {
    // In a real app, you would use Resend or Nodemailer here.
    // For now, we mock it by logging the verification link to the console.

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationLink = `${baseUrl}/api/auth/verify?token=${token}`;

    console.log("==================================================");
    console.log(`[MOCK EMAIL] Sending verification email to: ${email}`);
    console.log(`[MOCK EMAIL] Link: ${verificationLink}`);
    console.log("==================================================");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
}
