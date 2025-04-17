'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';
import {validateStudent} from '@/services/student-validation';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setLoginError('No account found. Please sign up.');
        return;
      }

      const user = JSON.parse(storedUser);
      if (user.email !== email || user.password !== password) {
        setLoginError('Invalid credentials.');
        return;
      }

      const isValidStudent = await validateStudent(email);
      setIsStudent(isValidStudent);

      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } catch (error: any) {
      setLoginError(
        error.message || 'An error occurred while attempting to log in.'
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            Log In
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Student Email"
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
              Log In
            </Button>
          </form>
          {loginError && (
            <p className="mt-4 text-center text-red-500">{loginError}</p>
          )}
          {isStudent && (
            <p className="mt-4 text-center text-green-500">
              You are eligible for a student discount!
            </p>
          )}
          <div className="mt-4 text-center">
            <Link
              href="/sign-up"
              className="text-primary hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

