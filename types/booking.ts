export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // 分鐘
  price: number;
  image: string;
  category:
    | 'venue'
    | 'balloon'
    | 'backdrop'
    | 'planning'
    | 'photography'
    | 'hosting'
    | 'other';
  requiresPerformer: boolean; // 是否需要選擇表演者
  bookingType: 'completion' | 'timeSlot'; // 完成時間點 | 表演時段
}

export interface Staff {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialties: string[];
  availableDays: number[]; // 0-6 (Sunday-Saturday)
}

export interface TimeSlot {
  time: string;
  available: boolean;
  staffId?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: number;
  notes?: string;
}

export interface Booking {
  id: string;
  services: Service[];
  staff: Staff;
  date: Date;
  time: string;
  customerInfo: CustomerInfo;
  paymentMethod: 'online' | 'onsite';
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
