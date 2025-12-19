# Product Specification: Seya AI Writer

## Overview
Seya is an AI-powered writing assistant SaaS application designed to help users generate high-quality content efficiently. It leverages advanced AI models and integrates with n8n for robust workflow automation.

## Core Features

### 1. AI Chat Interface
- **Functionality**: A centralized chat interface where users can send prompts and receive AI-generated text.
- **Components**: Real-time streaming response, history management, and input controls.

### 2. Authentication
- **Functionality**: Secure user onboarding and access control.
- **Flows**: Sign up, Log in, Password recovery.
- **Status**: Implemented with protected routes (AuthGate).

### 3. Pricing & Payments
- **Functionality**: Subscription-based monetization model.
- **Integration**: Payment processing via Paymob.
- **Pages**: Dedicated pricing page enabling users to select and purchase plans.

### 4. Workflow Automation (n8n)
- **Functionality**: Backend integration with n8n to handle complex logic and data processing tasks offloaded from the main application.
- **Architecture**: Next.js API proxying requests to n8n webhooks.

### 5. Marketing Site
- **Pages**:
    - **Home**: Hero section, features overview, testimonials.
    - **About**: Company verification and mission.
    - **Capabilities**: detailed breakdown of AI features.
    - **Contact**: User support and inquiry forms.
    - **Legal**: Privacy Policy and Terms of Service.

## technical Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS / Tailwind (to be confirmed)
- **Infrastructure**: Docker support, Vercel deployment ready.

## User Experience Goals
- **Premium Design**: aesthetically pleasing, modern UI/UX with smooth animations.
- **Responsiveness**: Fully functional on mobile and desktop devices.
- **Performance**: Fast load times and low-latency AI responses.
