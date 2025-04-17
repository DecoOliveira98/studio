'use client';

import Link from 'next/link';
import {RoomList} from '@/components/room-list';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-secondary">
      <Card className="w-full max-w-2xl rounded-box shadow-normal transition-colors">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-center">
            Dublin Quiet Spaces
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoggedIn ? (
            <>
              <RoomList />
              <div className="mt-6 text-center">
                <Link href="/room-recommendation">
                  <Button className="rounded-box transition-colors hover-scale">
                    Get a Room Recommendation
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Please log in to see available rooms and get recommendations.
              </p>
              <Link href="/login">
                <Button className="rounded-box transition-colors hover-scale">
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
