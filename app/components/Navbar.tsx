import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ThemeToggle } from './Themetoggle';
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from './UserNav';

export default async function Navbar() {
    const {isAuthenticated} = getKindeServerSession();
    return (
        <nav className="border-b bg-background h-[10vh] flex items-center">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-3xl">
              Marshal<span className="text-primary">Saas</span>
            </h1>
          </Link>
  
          <div className="flex items-center gap-x-5">
            <ThemeToggle />

            {(await isAuthenticated()) ? (
                // <LogoutLink>
                //     <Button>Log Out</Button>
                // </LogoutLink>
                <UserNav/>
            ) : (
                <div className="flex items-center gap-x-5">
                        <LoginLink>
                            <Button>Sign In</Button>
                        </LoginLink>
                        
                        <RegisterLink>
                            <Button variant="secondary">Sign Up</Button>
                        </RegisterLink>
                    </div>
            )}
  
          </div>
        </div>
      </nav>
       
    );
}


