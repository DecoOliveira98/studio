'use client';

import {useSearchParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {
  constructBookingConfirmationEmailBody,
  sendBookingConfirmationEmail,
} from '@/services/email-service';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);

  const name = searchParams.get('name');
  const location = searchParams.get('location');
  const capacityString = searchParams.get('capacity');
  const pricePerHourString = searchParams.get('pricePerHour');
  const amenities = searchParams.get('amenities');
  const date = searchParams.get('date');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const numberOfPeopleString = searchParams.get('numberOfPeople');

  // Convert to number
  const capacity = capacityString ? parseInt(capacityString, 10) : null;
  const pricePerHour = pricePerHourString ? parseFloat(pricePerHourString) : null;
  const numberOfPeople = numberOfPeopleString ? parseInt(numberOfPeopleString, 10) : null;

  const pricePerPerson = capacity && pricePerHour ? (pricePerHour / capacity) : 0;

  const handleConfirmBooking = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('No user found. Please log in.');
        return;
      }

      const user = JSON.parse(storedUser);
      const email = user.email;

      if (!email) {
        alert('No email found for the user.');
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Payment processed successfully!');

      const html = await constructBookingConfirmationEmailBody({
        name,
        location,
        capacity,
        pricePerHour: pricePerPerson,
        amenities,
        date,
        startTime,
        endTime,
        numberOfPeople,
      });

      if (!html) {
        alert('Could not construct email body.');
        return;
      }

      await sendBookingConfirmationEmail({
        to: email,
        subject: 'Booking Confirmation',
        html: html,
      });

      setEmailSent(true);
    } catch (error: any) {
      console.error('Failed to send email:', error);
      alert('Failed to send booking confirmation email.');
    }
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
          <p>Price per person: ${pricePerPerson.toFixed(2)}</p>
          <p>Amenities: {amenities}</p>
          <p>Date: {date}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <p>Number of People: {numberOfPeople}</p>
          <Button className="mt-4 rounded-box transition-colors hover-scale" onClick={handleConfirmBooking} disabled={emailSent}>
            {emailSent ? 'Booking Confirmed and Email Sent!' : 'Confirm Booking'}
          </Button>
          {emailSent && <p className="mt-4 text-green-500">Booking confirmation email sent!</p>}
        </CardContent>
      </Card>
    </div>
  );
}


