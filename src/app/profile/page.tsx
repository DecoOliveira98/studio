'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

interface User {
  email: string;
  password?: string;
  college?: string;
  name?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({email: ''});
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || '');
      setCollege(parsedUser.college || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollege(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {...user, name: name, college: college};
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated!');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-box"
              value={user.email}
              disabled
            />
            <Input
              type="text"
              placeholder="Name"
              className="rounded-box"
              value={name}
              onChange={handleNameChange}
            />
            <Input
              type="text"
              placeholder="College"
              className="rounded-box"
              value={college}
              onChange={handleCollegeChange}
            />
            <Button type="submit" className="rounded-box transition-colors hover-scale">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
