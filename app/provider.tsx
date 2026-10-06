'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import axios from 'axios';

function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();

    useEffect(() => {
        data?.user?.email && createNewUser();

    }, [data]);

    const { data: session } = useSession();


    const createNewUser = async () => {
        const result = await axios.post('/api/user', {});
        console.log(result);
    }
    return (
        <div>{children}</div>
    )
}

export default Provider