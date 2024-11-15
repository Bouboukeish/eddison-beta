import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
    return <AuthenticateWithRedirectCallback
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/auth/callback"
    />;
};
