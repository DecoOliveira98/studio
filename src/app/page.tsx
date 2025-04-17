'use client';

import {RoomList} from '@/components/room-list';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start p-8">
      <RoomList />
    </main>
  );
}

