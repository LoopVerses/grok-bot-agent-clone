'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Provider from '@/app/provider';

/**
 * Provides the NextAuth session and user-creation behavior to child components.
 *
 * @param children - The content that needs access to the session.
 * @returns The children wrapped in the session and user-creation providers.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>   
    <Provider>  
    {children}
    </Provider>
    </SessionProvider>;
}
