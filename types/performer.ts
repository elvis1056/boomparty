export interface Performer {
  id: number;
  name: string;
  nickname: string;
  category: string;
  specialties: string[];
  experience: string;
  description: string;
  image: string;
  video?: string;
  highlights: string[];
}
