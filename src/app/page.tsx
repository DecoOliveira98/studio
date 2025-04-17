'use client';

import Link from 'next/link';
import {RoomList} from '@/components/room-list';
import {useState} from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Dublin Quiet Spaces</h1>

      {isLoggedIn ? (
        <>
          <RoomList />
          <Link href="/room-recommendation" className="mt-4 text-blue-500 hover:underline">
            Get a Room Recommendation
          </Link>
        </>
      ) : (
        <>
          <p>Please log in to see available rooms and get recommendations.</p>
          <Link href="/login" className="mt-4 text-blue-500 hover:underline">
            Log In
          </Link>
        </>
      )}
    </main>
  );
}
