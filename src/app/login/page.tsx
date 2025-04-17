'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-secondary">
      <Card className="w-full max-w-md rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            Log In
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" className="rounded-box" />
            <Input
              type="password"
              placeholder="Password"
              className="rounded-box"
            />
            <Button className="rounded-box transition-colors hover-scale">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-primary hover:underline transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
