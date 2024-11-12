import { z } from "zod";

const regex = {
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
};

export const SignUpSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
