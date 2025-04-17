
/**
 * Represents a room in Dublin.
 */
export interface Room {
  /**
   * The ID of the room.
   */
  id: string;
  /**
   * The name of the room.
   */
  name: string;
  /**
   * The location of the room.
   */
  location: string;
  /**
   * The amenities of the room.
   */
  amenities: string[];
  /**
   * The capacity of the room.
   */
  capacity: number;
  /**
   * The price per hour of the room.
   */
  pricePerHour: number;
}

/**
 * Represents a booking for a room.
 */
export interface Booking {
  /**
   * The ID of the booking.
   */
  id: string;
  /**
   * The ID of the room.
   */
  roomId: string;
  /**
   * The start time of the booking.
   */
  startTime: Date;
  /**
   * The end time of the booking.
   */
  endTime: Date;
  /**
   * The user ID of the booking.
   */
  userId: string;
}

/**
 * Asynchronously retrieves available rooms in Dublin.
 * @returns A promise that resolves to an array of Room objects.
 */
export async function getAvailableRooms(): Promise<Room[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'Meeting Room 1',
      location: 'Dublin City Centre',
      amenities: ['Whiteboard', 'Projector', 'Wifi'],
      capacity: 10,
      pricePerHour: 50,
    },
    {
      id: '2',
      name: 'Study Room 2',
      location: 'Trinity College',
      amenities: ['Wifi', 'Power Outlets'],
      capacity: 4,
      pricePerHour: 20,
    },
    {
      id: '3',
      name: 'Innovation Lab',
      location: 'Docklands',
      amenities: ['Interactive Whiteboard', 'VR Headsets', '3D Printer', 'High-Speed Wifi'],
      capacity: 15,
      pricePerHour: 75,
    },
    {
      id: '4',
      name: 'Quiet Zone 42',
      location: 'National Library',
      amenities: ['Soundproof Walls', 'Individual Desks', 'Reading Lamps'],
      capacity: 6,
      pricePerHour: 30,
    },
    {
      id: '5',
      name: 'Brainstorming Suite',
      location: 'Guinness Storehouse Area',
      amenities: ['Large Tables', 'Markers', 'Idea Paint Walls', 'Coffee Machine'],
      capacity: 12,
      pricePerHour: 60,
    },
    {
      id: '6',
      name: 'Coffee Shop Nook',
      location: 'Georges Street Arcade',
      amenities: ['Wifi', 'Coffee', 'Pastries'],
      capacity: 2,
      pricePerHour: 5,
    },
    {
      id: '7',
      name: 'The Coffee Pod',
      location: 'Grafton Street',
      amenities: ['Wifi', 'Coffee', 'Snacks'],
      capacity: 3,
      pricePerHour: 7,
    },
  ];
}

/**
 * Asynchronously books a room.
 *
 * @param roomId The ID of the room to book.
 * @param startTime The start time of the booking.
 * @param endTime The end time of the booking.
 * @param userId The user ID of the booking.
 * @returns A promise that resolves to a Booking object.
 */
export async function bookRoom(
  roomId: string,
  startTime: Date,
  endTime: Date,
  userId: string
): Promise<Booking> {
  // TODO: Implement this by calling an API.

  return {
    id: '1',
    roomId: roomId,
    startTime: startTime,
    endTime: endTime,
    userId: userId,
  };
}
