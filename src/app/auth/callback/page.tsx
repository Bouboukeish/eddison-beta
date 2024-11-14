import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

const AuthCallbackPage = async () => {
    try {
        const user = await currentUser();

        if (!user?.id || !user.emailAddresses[0].emailAddress) {
            return redirect("/auth/signin");
        }

        // Create or update user in Supabase
        const { error } = await supabase
            .from('users')
            .upsert({
                id: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                avatar_url: user.imageUrl,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id'
            });

        if (error) {
            console.error('Error syncing user to Supabase:', error);
            throw error;
        }

        return redirect("/dashboard");
    } catch (error) {
        console.error('Error in auth callback:', error);
        return redirect("/auth/signin?error=callback_failed");
    }
};

export default AuthCallbackPage;
