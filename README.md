# Nokia Rollout Management System

A comprehensive project rollout and activity management system for Nokia telecom infrastructure projects in the Philippines.

## Features

- **Site Masterlist Management** - Import and manage all site locations
- **RAAWA Monitoring** - Track RAAWA validity and requirements
- **TOWERCO Monitoring** - Manage towerco permits and validity
- **Planned Deployment** - Schedule activities for different project types
- **Actual Deployment** - Real-time progress tracking with unlimited updates
- **Engineer Portal** - Activity reporting and issue logging
- **Dashboard** - Real-time monitoring with notifications
- **Progress Reports** - Date-controlled project reporting
- **Personnel Management** - Manage engineers and subcontractors

## Tech Stack

- React with TypeScript
- Cloudflare Pages
- Supabase (PostgreSQL)
- Recharts for visualizations

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
5. Deploy to Cloudflare: `npm run deploy`

## Database Setup

1. Create a Supabase project
2. Run the migration scripts in `/supabase/migrations`
3. Update the Supabase credentials in `src/lib/supabaseClient.ts`

## Environment Variables

Create a `.env` file:
