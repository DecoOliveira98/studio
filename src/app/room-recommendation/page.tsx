'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

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

const formSchema = z.object({
  preferredLocation: z.string().min(2, {
    message: 'Preferred location must be at least 2 characters.',
  }),
  amenities: z.string().optional(),
  desiredLevelOfQuietness: z.string().min(2, {
    message: 'Desired level of quietness must be at least 2 characters.',
  }),
  userProfile: z.string().optional(),
});

export default function RoomRecommendationPage() {
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredLocation: '',
      amenities: '',
      desiredLevelOfQuietness: '',
      userProfile: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await roomRecommendation(values);
    setRecommendation(result.recommendation);
  }

  return (
    <div className="flex flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Room Recommendation</h1>
      <Card className="w-[80%]">
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {recommendation && (
        <Card className="w-[80%] mt-8">
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
