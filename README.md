# Nexora Portfolio Application

This is a portfolio website built with React, TypeScript, and Tailwind CSS. This project is implementation of a portfolio website, focusing on best practices and modern web development techniques.

## Tech Stack

- **Frontend**: 
  - React 18+ with TypeScript
  - Vite for fast development and building
  - Tailwind CSS for styling
  - shadcn/ui components for UI elements
  
- **State Management**: 
  - React Query for data fetching
  - React Context for theme and app-wide state
  
- **Backend**:
  - Supabase Edge Functions for serverless operations
  - Supabase for database, authentication, and storage
  

## Features

- Responsive design optimized for all devices
- Dark/light mode with multiple theme options
- Interactive CV with PDF export
- Project showcase with filtering
- Blog with markdown content
- Contact form with email notifications
- Cyberpunk-inspired UI with customizable themes

## Project Structure

```
src/
├── components/         # UI components
│   ├── cv/             # CV-specific components
│   └── ui/             # shadcn/ui components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility libraries
├── pages/              # Page components
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm, yarn, or pnpm
- A Supabase account (for backend functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd developer-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Create a `.env` file based on `.env.example` and add your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Access the site at `http://localhost:5173` (or the port shown in your terminal)

## Database Setup

This project uses Supabase as its backend. The database schema includes tables for:

- `cv`: CV data including experience, education, and skills
- `projects`: Portfolio projects
- `blog_posts`: Blog content
- `contact_submissions`: Contact form submissions

To set up the database:

1. Create a new Supabase project
2. Run the SQL migrations in `supabase/migrations/`
3. Update your `.env` file with the Supabase URL and anon key

## Customization

### Themes

The application supports multiple themes that can be modified in `src/contexts/ThemeContext.tsx`:

- Cyberpunk (default)
- Minimal
- Neon
- Dark Mode
- Light Mode

### Content

Update your portfolio content by:

1. Modifying the Supabase `cv`, `projects`, and `blog_posts` tables
2. Updating social media links in the `.env` file
3. Customizing components in the `src/components` directory

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Supabase for backend functionality
