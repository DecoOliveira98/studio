'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError(null);

    try {
      if (!email.includes('@')) {
        setSignUpError('Please enter a valid email address.');
        return;
      }

      if (password.length < 8) {
        setSignUpError('Password must be at least 8 characters long.');
        return;
      }

      const user = {
        email: email,
        password: password,
      };
      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } catch (error: any) {
      setSignUpError(
        error.message || 'An error occurred while attempting to sign up.'
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-secondary">
      <Card className="w-full max-w-md rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-box"
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              placeholder="Password"
              className="rounded-box"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button type="submit" className="rounded-box transition-colors hover-scale">
              Sign Up
            </Button>
          </form>
          {signUpError && (
            <p className="mt-4 text-center text-red-500">{signUpError}</p>
          )}
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
