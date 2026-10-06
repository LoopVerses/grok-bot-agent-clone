'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import axios from 'axios';

/**
 * Renders children and requests user creation when the session has an email.
 * Must be rendered within a NextAuth SessionProvider.
 *
 * @param children - The content to render.
 * @returns The children wrapped in a div.
 */
function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();

    useEffect(() => {
        data?.user?.email && createNewUser();

    }, [data]);

    const { data: session } = useSession();


    /**
     * Posts to the user endpoint and logs the successful response.
     * @returns A promise that resolves after logging or rejects if the request fails.
     */
    const createNewUser = async () => {
        try {
            const result = await axios.post("/api/user", {});
            console.log("User created:", result.data);
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };
    return (
        <div>{children}</div>
    )
}

export default Provider