// components/Header.jsx
'use client';

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';

/**
 * Header is a client component. It should NOT import any server-only modules (like prisma/checkUser).
 * Pass the `user` (or relevant props) from a server parent (e.g. app/layout.jsx) if you need them.
 */
export default function Header({ user = null }) {
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="myhisab logo"
            height={60}
            width={200}
            className="h-20 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline" className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
