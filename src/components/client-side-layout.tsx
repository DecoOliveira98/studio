'use client';

import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export const ClientSideLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <>
      {isLoggedIn && (
        <Button variant="outline" onClick={handleLogout} className="w-full">
          Log Out
        </Button>
      )}
    </>
  );
};
