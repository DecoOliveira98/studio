
import {RoomList} from '@/components/room-list';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Dublin Quiet Spaces</h1>
      <RoomList />
    </main>
  );
}
