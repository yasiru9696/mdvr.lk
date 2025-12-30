import { ReactNode } from "react";

export interface NavItem {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Solution {
  details: ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  channels?: number | string;
  resolution?: string;
  storage?: string;
  features: string[];
  price: string;
  priceValue?: number; // Actual price for quotation calculations (not displayed)
  imageUrl: string;
  specifications: {
    [key: string]: string;
  };
  compatibleWith?: string[]; // IDs of compatible products (for DVR systems)
}