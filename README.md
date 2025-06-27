# Airsoft Occaz

Airsoft Occaz is a Next.js application designed for the airsoft community to buy and sell airsoft gear. It includes features like user-to-user chat, a rating system for transactions, and advanced search functionalities.

## Project Overview

For a detailed understanding of the Airsoft Occaz project, including its core features, target audience, technical architecture, and key workflows, please see the [Project Overview document](./PROJECT_OVERVIEW.md).

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Backend:** PocketBase (Self-hosted BaaS)
*   **Styling:** Tailwind CSS (with shadcn/ui components)
*   **Email:** React Email (using Resend for sending)
*   **Background Jobs/Tasks:** Trigger.dev
*   **Analytics:** PostHog
*   **Linting/Formatting:** BiomeJS
*   **Package Manager:** pnpm

## Project Structure

*   `src/app/`: Contains the Next.js app router pages, layouts, and API routes.
*   `src/components/`: Reusable UI components, including shadcn/ui components and custom ones.
*   `src/utils/`: Utility functions, helpers, and configurations (e.g., PocketBase client, constants).
*   `src/services/`: Modules for interacting with external services or managing specific functionalities (e.g., error monitoring, alerts).
*   `src/hooks/`: Custom React hooks.
*   `emails/`: Templates for emails sent by the application (using React Email).
*   `src/trigger/`: Definitions for Trigger.dev background jobs.
*   `public/`: Static assets.

## Getting Started

### Prerequisites

*   Node.js (latest LTS version recommended)
*   pnpm (Package manager)
*   Docker and Docker Compose (for running PocketBase locally)

### Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to `src/env.ts` for a comprehensive list. Key variables include:

*   `NEXT_PUBLIC_POCKETBASE_URL`: URL of your PocketBase instance (e.g., `http://127.0.0.1:8090`).
*   `POCKETBASE_ADMIN_EMAIL`: Admin email for PocketBase.
*   `POCKETBASE_ADMIN_PASSWORD`: Admin password for PocketBase.
*   `RESEND_API_KEY`: API key for Resend (if used for sending emails).
*   `TRIGGER_API_KEY`: API key for Trigger.dev (if using Trigger.dev Cloud, otherwise not needed for self-hosting).
*   `NEXT_PUBLIC_POSTHOG_KEY`: Public key for PostHog.
*   `NEXT_PUBLIC_SITE_URL`: The public URL of your site (e.g., `http://localhost:3000` for local development).
*   `STRIPE_SECRET_KEY`: Stripe secret key for payment processing.
*   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key.
*   `IMAGEKIT_PRIVATE_KEY`: ImageKit private key for image transformations and delivery.
*   `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: ImageKit public key.
*   `RESIZE_IT_API_KEY`: API key for Resize.it service.
*   `OPENROUTER_API_KEY`: API key for OpenRouter AI services.
*   `ENABLE_FRANCE_AIRSOFT_SCRAPER`: Controls the France Airsoft scraper. Set to `true` to enable or `false` to disable. Defaults to `true`. This was added to manage external service rate limits more effectively.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd soft-occaz
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Set up PocketBase:
    *   The project includes a `docker-compose.yml` file for PocketBase. Run:
        ```bash
        docker-compose up -d
        ```
    *   Access PocketBase admin UI at `http://localhost:8090/_/` (or your configured URL) and complete the initial setup (create admin user).
    *   (Optional: Run the seed script to populate the database with initial data):
        ```bash
        pnpm run seed
        ```

### Running the Development Server

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

*   `pnpm dev`: Starts the development server with Turbopack.
*   `pnpm email:dev`: Starts the React Email development server on port 3030.
*   `pnpm email:export`: Exports email templates to static HTML files.
*   `pnpm build`: Builds the application for production.
*   `pnpm start`: Starts a production server (after running `pnpm build`).
*   `pnpm lint`: Runs BiomeJS to check for linting and formatting issues.
*   `pnpm stripe:listen`: Forwards Stripe webhook events to your local server.
*   `pnpm seed`: Populates the database with initial data (executes `src/scripts/seed.ts`).
*   `pnpm typegen`: Generates TypeScript types from your PocketBase schema.
*   `pnpm knip`: Runs Knip to find unused files, dependencies, and exports.

## Deployment

The application is configured for deployment on Vercel. You can connect your Git repository to Vercel for automatic deployments. Ensure all necessary environment variables are configured in your Vercel project settings.

For self-hosting, you would typically build the Next.js application using `pnpm build` and then run it using `pnpm start` with a process manager like PM2. PocketBase would need to be hosted separately or using the provided Docker Compose setup.

## License

All rights reserved. (No license file found in the repository).
