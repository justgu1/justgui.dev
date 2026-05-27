export interface Project {
  id: string;
  slug: string;
  number: string;
  name: string;
  category: string;
  tech: string;
  description: string;
  tags: string[];
  href?: string;
  featured?: boolean;
  featuredLabel?: string;
  featuredYear?: string;
  featuredTitleEm?: string;
}
