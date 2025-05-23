# Project Overview: Airsoft Occaz

## 1. Introduction

Airsoft Occaz is a modern web application designed to serve the French airsoft community. It functions as a centralized marketplace for buying, selling, and discovering new and used airsoft equipment, including replicas, gear, and accessories. The platform aims to provide a user-friendly experience, facilitate communication between users, and potentially aggregate listings from other popular French airsoft forums and websites.

## 2. Core Features

The platform offers a comprehensive suite of features for airsoft enthusiasts:

*   **User Authentication & Profiles:**
    *   Secure user registration and login (email/password and potentially OAuth providers).
    *   User profiles displaying listings, reviews, and other relevant information.
*   **Listings (Annonces):**
    *   Creation of detailed listings for airsoft items, including descriptions, images, price, condition, and category.
    *   Management of own listings through a user dashboard (edit, mark as sold, delete).
    *   Search and advanced filtering capabilities to easily find specific items (by type, brand, price, location, etc.).
    *   Detailed listing pages with image galleries, seller contact options, and similar item suggestions.
*   **User Dashboard:**
    *   Centralized hub for users to manage their activities:
        *   **My Listings:** Overview and management of active and past listings.
        *   **Chats:** Integrated messaging system for communication with other users.
        *   **Favorites:** Management of saved/bookmarked listings.
        *   **Ratings:** View received ratings and rate other users after transactions.
        *   **Settings:** Account management, notification preferences, and profile customization.
        *   **Plans:** (Potential feature) Different subscription tiers or listing promotion options.
*   **Messaging/Chat System:**
    *   Real-time chat functionality for direct communication between buyers and sellers.
    *   Notifications for new messages.
*   **Rating and Review System:**
    *   Users can rate and review each other based on transactions, building trust within the community.
*   **Referral Program (Parrainage):**
    *   Incentive system for users to invite new members to the platform.
*   **Content Aggregation & Import:**
    *   Automated scraping of listings from external airsoft websites (e.g., Airsoft Occasion, France-Airsoft) to provide a wider selection.
    *   Ability for users to potentially submit URLs from supported external sites to import listings.
*   **Admin Capabilities:**
    *   (Inferred) Management interface via PocketBase admin UI for overseeing users, listings, and site content.

## 3. Technical Architecture High-Level

*   **Frontend:**
    *   **Framework:** Next.js 13+ (App Router)
    *   **Language:** TypeScript
    *   **UI Components:** shadcn/ui, custom React components
    *   **State Management:** React Context, Zustand (based on `src/utils/pocketbase/stores`) or similar for client-side state.
    *   **Styling:** Tailwind CSS
*   **Backend (BaaS):**
    *   **Platform:** PocketBase (self-hosted or cloud)
    *   **Database:** SQLite (embedded in PocketBase)
    *   **API:** Realtime database, RESTful API provided by PocketBase, extended with custom Next.js API routes where needed.
*   **Image Management:**
    *   Likely uses ImageKit.io for image hosting, optimization, and delivery (inferred from `api/ik/auth`).
*   **Background Jobs & Automation:**
    *   **Service:** Trigger.dev
    *   **Tasks:** Includes scraping external sites, processing imported URLs, sending notifications (e.g., unread messages).
*   **Analytics:**
    *   PostHog for product analytics and user behavior tracking.
*   **Deployment:**
    *   Flexible deployment options, including Vercel (common for Next.js) or self-hosting via Docker.

## 4. Key Workflows (Examples)

*   **User Registration:** New user signs up -> data saved to PocketBase -> user can log in.
*   **Creating a Listing:** User fills out `ListingForm` -> data submitted (potentially with image uploads to ImageKit) -> new listing record created in PocketBase -> listing appears in search results.
*   **User Interaction:** User A finds User B's listing -> User A contacts User B via chat -> they arrange a transaction -> User A and User B rate each other.
*   **Scraping Task:** Scheduled Trigger.dev job runs -> fetches data from an external site -> processes and saves new/updated listings to PocketBase.

This overview provides a general understanding of the Airsoft Occaz project. More detailed documentation on specific components, APIs, and database schemas may be developed as needed.
