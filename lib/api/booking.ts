import type {
  BookingApiResponse,
  CreateBookingApiRequest,
} from '@/types/booking';

import { apiClient } from './client';

export const createBooking = (
  data: CreateBookingApiRequest
): Promise<BookingApiResponse> => {
  return apiClient.post<BookingApiResponse>('/api/bookings', data);
};

export const getBookingByReference = (
  reference: string
): Promise<BookingApiResponse> => {
  return apiClient.get<BookingApiResponse>(`/api/bookings/${reference}`);
};
