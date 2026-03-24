# Jabaa Shop - Afaan Oromoo Ebook Platform

A professional ebook platform with manual payment and receipt verification system, translated into Afaan Oromoo.

## Features
- **Admin Panel**: Upload books, manage receipts, and edit existing posts.
- **User Dashboard**: View purchased books, upload receipts, and preview content.
- **2-Page Preview**: Users can read a 2-page preview of the books before buying.
- **Manual Payment**: Users upload receipts for verification by the admin.
- **Supabase Integration**: Uses Supabase for Auth, Database, and Storage.

## Setup Instructions
1. **Supabase Setup**:
   - Create a new Supabase project.
   - Create the following tables:
     - `books`: `id`, `title`, `price`, `description`, `cover_url`, `pdf_url`, `preview_url`, `created_at`.
     - `receipts`: `id`, `user_id`, `book_id`, `receipt_url`, `status` (pending, approved, declined), `created_at`.
   - Create the following storage buckets (set to public):
     - `covers`
     - `books`
     - `receipts`
   - Run the SQL to add the `preview_url` column:
     ```sql
     ALTER TABLE books ADD COLUMN IF NOT EXISTS preview_url TEXT;
     ```
2. **Environment Variables**:
   - Update `app.js` with your Supabase URL and Anon Key.
3. **Deployment**:
   - To sync your changes from AI Studio to GitHub, go to **Settings** (⚙️ gear icon) -> **Export to GitHub**.

## How to Sync to GitHub
The updates I make here in AI Studio are in a separate development environment. To update your GitHub repository:
1. Click the **Settings** (⚙️ gear icon) in the top-right corner.
2. Select **Export to GitHub**.
3. Follow the prompts to sync your changes.
