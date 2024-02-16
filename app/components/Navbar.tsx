import Link from 'next/link';
import React from 'react';

export default function Navbar() {
    return (
        <div>
            <nav className='border-b bg-background h-[10vh] flex items-center'>
                <div className='container flex items-center justify-bitween'>
                   <Link href="/">MarshalSaas</Link> 
                </div>
            </nav>
        </div>
    );
}

