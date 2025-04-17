'use client';

import {useSearchParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const location = searchParams.get('location');
  const capacity = searchParams.get('capacity');
  const pricePerHour = searchParams.get('pricePerHour');
  const amenities = searchParams.get('amenities');
  const date = searchParams.get('date');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  const handleConfirmBooking = () => {
    alert('Booking confirmed!');
    // You can add booking logic here, such as calling an API
    // to save the booking in a database.
  };

  return (
    <div className="flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold mb-8">Booking Confirmation</h1>
      <Card className="w-full max-w-2xl rounded-box shadow-normal transition-colors">
        <CardHeader>
          <CardTitle>Please confirm your booking details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Capacity: {capacity}</p>
          <p>Price per hour: {pricePerHour}</p>
          <p>Amenities: {amenities}</p>
          <p>Date: {date}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <Button className="mt-4 rounded-box transition-colors hover-scale" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
