import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
    return <AuthenticateWithRedirectCallback
        afterSignInUrl="/app"
        afterSignUpUrl="/auth/callback"
    />;
};