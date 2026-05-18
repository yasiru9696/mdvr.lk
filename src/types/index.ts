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