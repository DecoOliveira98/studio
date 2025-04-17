'use client';

import {useEffect, useState} from 'react';
import {getAvailableRooms, Room} from '@/services/room-booking';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Label} from '@/components/ui/label';

const bookingFormSchema = z.object({
  date: z.date({
    required_error: 'A date is required.',
  }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  numberOfPeople: z.number().min(1, {message: 'Must be at least 1 person.'}).default(1),
});

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const bookingForm = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: new Date(),
      startTime: '09:00',
      endTime: '17:00',
      numberOfPeople: 1,
    },
  });

  useEffect(() => {
    async function loadRooms() {
      const availableRooms = await getAvailableRooms();
      setRooms(availableRooms);
    }

    loadRooms();
  }, []);

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    if (!selectedRoom) {
      alert('Please select a room.');
      return;
    }

    router.push(
      `/booking-confirmation?name=${selectedRoom.name}&location=${selectedRoom.location}&capacity=${selectedRoom.capacity}&pricePerHour=${selectedRoom.pricePerHour}&amenities=${selectedRoom.amenities.join(', ')}&date=${values.date.toISOString()}&startTime=${values.startTime || '09:00'}&endTime=${values.endTime || '17:00'}&numberOfPeople=${values.numberOfPeople}`
    );
  }

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
                <p className="text-sm">Amenities: {room.amenities.join(', ')}</p>
                <p className="text-sm">
                  Price per person: $
                  {room.capacity ? (room.pricePerHour / room.capacity).toFixed(2) : '20.00'}
                </p>
                <Button onClick={() => handleBookRoom(room)}>Check Availability</Button>
              </CardContent>
            </div>
          </div>
          {selectedRoom?.id === room.id && (
            <CardContent className="p-4">
              <Form {...bookingForm}>
                <form onSubmit={bookingForm.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={bookingForm.control}
                    name="date"
                    render={({field}) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            side="bottom"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={false}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Please select the date for your booking.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <FormField
                      control={bookingForm.control}
                      name="startTime"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" className="rounded-box" {...field} />
                          </FormControl>
                          <FormDescription>Enter the start time.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={bookingForm.control}
                      name="endTime"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" className="rounded-box" {...field} />
                          </FormControl>
                          <FormDescription>Enter the end time.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                      control={bookingForm.control}
                      name="numberOfPeople"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Number of People</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="rounded-box"
                              placeholder="1"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Specify the number of people for the booking.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <Button type="submit" className="rounded-box transition-colors hover-scale">
                    Book Room
                  </Button>
                </form>
              </Form>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

