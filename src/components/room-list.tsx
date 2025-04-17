'use client';

import {useEffect, useState} from 'react';
import {getAvailableRooms, Room} from '@/services/room-booking';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

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
        <Card key={room.id} className="rounded-xl">
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Capacity: {room.capacity}</p>
            <p>Price per hour: ${room.pricePerHour}</p>
            <p>Amenities: {room.amenities.join(', ')}</p>
            <Button>Book Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

