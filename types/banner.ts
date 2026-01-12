export interface BannerImage {
  id: number;
  src: string;
  alt: string;
}

export interface BannerContent {
  title?: string;
  subtitle?: string;
  actions?: {
    text: string;
    href: string;
  }[];
}
