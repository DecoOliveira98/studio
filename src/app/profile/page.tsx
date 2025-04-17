'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

interface User {
  email: string;
  password?: string;
  college?: string;
  name?: string;
  profilePicture?: string;
  age?: number;
  bio?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({email: ''});
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [bio, setBio] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || '');
      setCollege(parsedUser.college || '');
      setProfilePicture(parsedUser.profilePicture || '');
      setAge(parsedUser.age || undefined);
      setBio(parsedUser.bio || '');
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

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === '' ? undefined : parseInt(value, 10));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (age !== undefined && (age < 1 || age > 120)) {
      alert('Please enter a valid age between 1 and 120.');
      return;
    }

    const updatedUser = {
      ...user,
      name: name,
      college: college,
      profilePicture: profilePicture,
      age: age,
      bio: bio,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated!');
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="rounded-box"
                value={user.email}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                className="rounded-box"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="college">College</Label>
              <Input
                type="text"
                id="college"
                placeholder="College"
                className="rounded-box"
                value={college}
                onChange={handleCollegeChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                type="url"
                id="profilePicture"
                placeholder="Profile Picture URL"
                className="rounded-box"
                value={profilePicture}
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                placeholder="Age"
                className="rounded-box"
                value={age === undefined ? '' : age.toString()}
                onChange={handleAgeChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Bio"
                className="rounded-box"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <Button type="submit" className="rounded-box transition-colors hover-scale">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
