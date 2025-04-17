'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter} from 'next/navigation';

import {roomRecommendation} from '@/ai/flows/room-recommendation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {format} from 'date-fns';

const formSchema = z.object({
  preferredLocation: z.string().min(2, {
    message: 'Preferred location must be at least 2 characters.',
  }),
  amenities: z.string().optional(),
  desiredLevelOfQuietness: z.string().min(2, {
    message: 'Desired level of quietness must be at least 2 characters.',
  }),
  userProfile: z.string().optional(),
  date: z.date({
    required_error: 'A date is required.',
  }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export default function RoomRecommendationPage() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredLocation: '',
      amenities: '',
      desiredLevelOfQuietness: '',
      userProfile: '',
      date: new Date(),
      startTime: '',
      endTime: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await roomRecommendation(values);
    setRecommendation(result.recommendation);

    const roomDetails = result.roomDetails;

    // If we have room details, navigate to the booking confirmation page
    if (roomDetails) {
      const startTime = values.startTime || '09:00';
      const endTime = values.endTime || '17:00';

      router.push(
        `/booking-confirmation?name=${roomDetails.name}&location=${roomDetails.location}&capacity=${roomDetails.capacity}&pricePerHour=${roomDetails.pricePerHour}&amenities=${roomDetails.amenities}&date=${values.date.toISOString()}&startTime=${startTime}&endTime=${endTime}`
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold mb-8">Room Recommendation</h1>
      <Card className="w-full max-w-2xl rounded-box shadow-normal transition-colors">
        <CardHeader>
          <CardTitle>Tell us your preferences</CardTitle>
          <CardDescription>We'll find the perfect quiet space for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="preferredLocation"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. City Centre" {...field} />
                    </FormControl>
                    <FormDescription>Where are you looking to find a room?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amenities"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. Wifi, whiteboard" {...field} />
                    </FormControl>
                    <FormDescription>What amenities are important to you?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredLevelOfQuietness"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Desired Level of Quietness</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Silent, quiet, moderate" {...field} />
                    </FormControl>
                    <FormDescription>How quiet does the room need to be?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userProfile"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>User Profile</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional: Tell us a bit about yourself."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Information to help us tailor the recommendation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
              <Button type="submit" className="rounded-box transition-colors hover-scale">
                Check Availability
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {recommendation && (
        <Card className="w-full max-w-2xl mt-8 rounded-box shadow-normal transition-colors">
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
            <CardDescription>Here's what we recommend:</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
