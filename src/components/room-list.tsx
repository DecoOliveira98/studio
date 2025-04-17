'use client';

import {useEffect, useState} from 'react';
import {getAvailableRooms, Room} from '@/services/room-booking';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function loadRooms() {
      const availableRooms = await getAvailableRooms();
      setRooms(availableRooms);
    }

    loadRooms();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <Card key={room.id} className="flex flex-col rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src={`https://picsum.photos/300/200?random=${room.id}`}
                alt={room.name}
                width={300}
                height={200}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader className="p-4">
                <CardTitle>{room.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{room.location}</p>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm">Capacity: {room.capacity}</p>
                <p className="text-sm">Price per hour: ${room.pricePerHour}</p>
                <p className="text-sm">Amenities: {room.amenities.join(', ')}</p>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

