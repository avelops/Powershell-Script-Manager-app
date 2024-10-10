'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to manage your PowerShell scripts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn('azure-ad')} className="w-full">
            Sign in with Microsoft
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}