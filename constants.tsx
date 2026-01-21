import { 
  BarChart3, 
  GraduationCap, 
  Layers, 
  Globe2, 
  Cpu, 
  Lightbulb 
} from 'lucide-react';
import { NavItem, ServiceItem, StatItem, TestimonialItem } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Expertise', href: '#services' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Strategic Planning',
    description: 'We align educational goals with technological capabilities to create roadmap strategies that ensure long-term sustainability.',
    icon: Layers,
  },
  {
    title: 'LMS Implementation',
    description: 'End-to-end guidance on selecting, deploying, and optimizing Learning Management Systems for maximum adoption.',
    icon: Globe2,
  },
  {
    title: 'Curriculum Design',
    description: 'Transforming traditional courseware into engaging, digital-first learning experiences tailored for modern students.',
    icon: GraduationCap,
  },
  {
    title: 'Data Analytics',
    description: 'Leveraging institutional data to drive decision-making, improve retention rates, and optimize resource allocation.',
    icon: BarChart3,
  },
  {
    title: 'EdTech Infrastructure',
    description: 'Auditing and upgrading technical ecosystems to support scalable, secure, and high-performance learning environments.',
    icon: Cpu,
  },
  {
    title: 'Innovation Workshops',
    description: 'Training faculty and leadership on emerging trends like AI in education to foster a culture of continuous improvement.',
    icon: Lightbulb,
  },
];

export const STATS: StatItem[] = [
  { value: '12+', label: 'Years Experience' },
  { value: '45+', label: 'Institutions Transformed' },
  { value: '150k+', label: 'Students Impacted' },
  { value: '100%', label: 'Client Retention' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Bayl Consults didn't just implement a new system; they transformed our entire pedagogical approach. Their strategic insight is unmatched in the EdTech space.",
    author: "Dr. Sarah Jenkins",
    role: "Dean of Innovation",
    company: "Westfield University"
  },
  {
    quote: "The clarity and structure Bayl brought to our chaotic digital infrastructure was a game changer. We are now future-ready thanks to their guidance.",
    author: "Marcus Thorne",
    role: "CTO",
    company: "Horizon Learning Group"
  }
];