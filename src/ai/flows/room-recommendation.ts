'use server';

/**
 * @fileOverview A room recommendation AI agent.
 *
 * - roomRecommendation - A function that handles the room recommendation process.
 * - RoomRecommendationInput - The input type for the roomRecommendation function.
 * - RoomRecommendationOutput - The return type for the RoomRecommendation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getAvailableRooms, Room} from '@/services/room-booking';

const RoomRecommendationInputSchema = z.object({
  preferredLocation: z.string().describe('The preferred location of the room.'),
  amenities: z.string().describe('The amenities of the room.'),
  desiredLevelOfQuietness: z.string().describe('The desired level of quietness of the room, e.g. silent, quiet, moderate.'),
  userProfile: z.string().optional().describe('The user profile.'),
});
export type RoomRecommendationInput = z.infer<typeof RoomRecommendationInputSchema>;

const RoomDetailsSchema = z.object({
  name: z.string().describe('The name of the room.'),
  location: z.string().describe('The location of the room.'),
  capacity: z.number().describe('The capacity of the room.'),
  pricePerHour: z.number().describe('The price per hour of the room.'),
  amenities: z.string().describe('The amenities of the room.'),
});

const RoomRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The recommendation of the room.'),
  roomDetails: RoomDetailsSchema.optional().describe('Details of the recommended room.'),
});
export type RoomRecommendationOutput = z.infer<typeof RoomRecommendationOutputSchema>;

export async function roomRecommendation(input: RoomRecommendationInput): Promise<RoomRecommendationOutput> {
  return roomRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roomRecommendationPrompt',
  input: {
    schema: z.object({
      preferredLocation: z.string().describe('The preferred location of the room.'),
      amenities: z.string().describe('The amenities of the room.'),
      desiredLevelOfQuietness: z.string().describe('The desired level of quietness of the room, e.g. silent, quiet, moderate.'),
      userProfile: z.string().optional().describe('The user profile.'),
      availableRooms: z.string().describe('The available rooms.'),
    }),
  },
  output: {
    schema: z.object({
      recommendation: z.string().describe('The recommendation of the room, include name, location, capacity, price per hour, and amenities'),
      roomDetails: RoomDetailsSchema.optional().describe('Details of the recommended room.'),
    }),
  },
  prompt: `You are a helpful assistant that recommends quite rooms.

Based on the user's preferences, recommend a room from the available rooms.
Include name, location, capacity, price per hour, and amenities in your recommendation.

User preferences:
Location: {{{preferredLocation}}}
Amenities: {{{amenities}}}
Desired level of quietness: {{{desiredLevelOfQuietness}}}
User profile: {{{userProfile}}}

Available rooms: {{{availableRooms}}}

Recommendation:`,
});

const roomRecommendationFlow = ai.defineFlow<
  typeof RoomRecommendationInputSchema,
  typeof RoomRecommendationOutputSchema
>(
  {
    name: 'roomRecommendationFlow',
    inputSchema: RoomRecommendationInputSchema,
    outputSchema: RoomRecommendationOutputSchema,
  },
  async input => {
    const availableRooms: Room[] = await getAvailableRooms();
    const availableRoomsString = JSON.stringify(availableRooms);
    const {output} = await prompt({...input, availableRooms: availableRoomsString});
    return output!;
  }
);
