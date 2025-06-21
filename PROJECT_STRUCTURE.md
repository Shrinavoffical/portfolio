# Shrinav Portfolio - Project Structure & Components

## 📁 Project Overview
A modern, responsive portfolio website built with Next.js 14, featuring smooth animations, horizontal scrolling projects, and a professional design system.

## 🏗️ Architecture

### Core Technologies
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: GSAP with ScrollTrigger
- **Language**: TypeScript
- **Package Manager**: pnpm

### Project Structure
```
shrinav_portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── ClientLayout.tsx         # Client-side layout wrapper
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles & animations
├── components/                   # Reusable components
│   ├── HorizontalScrollProjects.tsx  # GSAP horizontal scroll
│   ├── UIComponents.tsx         # UI primitives (Card, Badge, etc.)
│   └── IconComponents.tsx       # Icon system
├── data/                        # Static data
│   └── siteData.json           # All site content & configuration
├── tailwind.config.ts          # Tailwind configuration
└── package.json                # Dependencies & scripts
```

## 🧩 Component Architecture

### 1. Layout Components
- **RootLayout** (`app/layout.tsx`): Server-side layout with metadata
- **ClientLayout** (`app/ClientLayout.tsx`): Client-side wrapper with cursor tracking

### 2. UI Components (`components/UIComponents.tsx`)
- **Card**: Flexible card container with variants
- **CardContent**: Card content wrapper
- **Badge**: Status/category badges
- **Button**: Interactive button component

### 3. Icon System (`components/IconComponents.tsx`)
- Centralized icon management using Lucide React
- Dynamic icon loading with `getIcon()` function
- Consistent sizing and styling

### 4. Project Showcase (`components/HorizontalScrollProjects.tsx`)
- GSAP-powered horizontal scrolling
- Smooth animations with ScrollTrigger
- Responsive design with mobile fallbacks
- Progress indicator and scroll hints

## 🎨 Design System

### Color Palette
- **Primary**: Lime (lime-500, lime-600)
- **Neutral**: Gray scale (gray-50 to gray-900)
- **Accent Colors**: Blue, Purple, Orange, Green
- **Gradients**: Dynamic gradients per project

### Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Responsive Sizing**: Custom fontSize scale in Tailwind config

### Animations
- **GSAP ScrollTrigger**: Horizontal scrolling, fade-ins, parallax
- **CSS Animations**: Gradient shifts, floating effects, ripples
- **Transitions**: Smooth hover states and interactions

## 📊 Data Structure

### Site Data (`data/siteData.json`)
```json
{
  "company": {
    "name": "Shrinav",
    "tagline": "Digital Innovation Studio",
    "stats": [...],
    "contact": {...}
  },
  "services": [...],
  "projects": [
    {
      "id": 1,
      "title": "FinTech Revolution",
      "category": "Web Application",
      "technologies": [...],
      "metrics": {...},
      "testimonial": {...}
    }
  ],
  "testimonials": [...],
  "navigation": [...]
}
```

### Project Schema
Each project includes:
- Basic info (title, category, client, duration)
- Technical details (technologies, features)
- Results & metrics
- Visual assets (images, colors, gradients)
- Client testimonials
- Live/GitHub URLs

## 🎯 Key Features

### 1. Horizontal Project Scrolling
- GSAP-powered smooth horizontal scroll
- Individual project animations
- Progress tracking
- Mobile-responsive fallback

### 2. Performance Optimizations
- Hardware acceleration (transform3d, will-change)
- Efficient GSAP context management
- Lazy loading and image optimization
- Reduced motion support for accessibility

### 3. Responsive Design
- Mobile-first approach
- Flexible grid systems
- Adaptive typography
- Touch-friendly interactions

### 4. Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences

## 🔧 Configuration

### Tailwind Config (`tailwind.config.ts`)
- Custom color system with CSS variables
- Extended font families and sizes
- Container configuration
- Plugin integration (tailwindcss-animate)

### Global Styles (`app/globals.css`)
- CSS custom properties for theming
- Animation keyframes and utilities
- Responsive breakpoints
- Performance optimizations

## 🚀 Development Workflow

### Scripts
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run lint`: Code linting

### Best Practices
- TypeScript for type safety
- Component composition over inheritance
- Consistent naming conventions
- Performance-first animations
- Mobile-responsive design

## 📱 Responsive Breakpoints
- **Mobile**: < 768px (single column, touch interactions)
- **Tablet**: 768px - 1024px (adapted layouts)
- **Desktop**: > 1024px (full horizontal scroll experience)

## 🎨 Animation Strategy
- **Entry Animations**: Fade-in with stagger effects
- **Scroll Animations**: GSAP ScrollTrigger for smooth parallax
- **Hover Effects**: Subtle transforms and color transitions
- **Loading States**: Shimmer effects and skeleton screens

## 🔍 SEO & Performance
- Next.js App Router for optimal SEO
- Metadata configuration in layout
- Image optimization with Next.js Image
- Core Web Vitals optimization
- Semantic HTML structure

This architecture provides a scalable, maintainable, and performant foundation for a modern portfolio website with exceptional user experience.