'use server';

/**
 * @fileOverview Email sending service.
 *
 * - sendBookingConfirmationEmail - A function that sends a booking confirmation email.
 */

export async function sendBookingConfirmationEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const enableEmail = process.env.NEXT_PUBLIC_ENABLE_EMAIL === 'true';

  if (enableEmail) {
    // TODO: Implement a real email sending mechanism here, such as SendGrid, Nodemailer, etc.
    // For now, just log the email to the console.
    console.log('Sending email:', {to, subject, html});
    try {
      // Simulate sending an email (replace with actual email sending logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send booking confirmation email.');
    }
  } else {
    console.log(
      'Email sending is disabled. Set NEXT_PUBLIC_ENABLE_EMAIL to true to enable.',
      {to, subject, html}
    );
  }
}

export function constructBookingConfirmationEmailBody({
  name,
  location,
  capacity,
  pricePerHour,
  amenities,
  date,
  startTime,
  endTime,
  numberOfPeople,
}: {
  name: string | null;
  location: string | null;
  capacity: number | null;
  pricePerHour: number | null;
  amenities: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  numberOfPeople: number | null;
}): string {
  return `
    <h1>Booking Confirmation</h1>
    <p>Thank you for your booking!</p>
    <p>Here are your booking details:</p>
    <ul>
      <li>Name: ${name}</li>
      <li>Location: ${location}</li>
      <li>Capacity: ${capacity}</li>
      <li>Price per hour: ${pricePerHour}</li>
      <li>Amenities: ${amenities}</li>
      <li>Date: ${date}</li>
      <li>Start Time: ${startTime}</li>
      <li>End Time: ${endTime}</li>
      <li>Number of People: ${numberOfPeople}</li>
    </ul>
  `;
}
