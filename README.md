# 🐙 Octo Chat

> A modern, secure, and fully anonymous messaging platform built for the web.

Octo Chat is a full-stack anonymous chatting application designed to provide a secure environment for users to communicate without compromising their identity. Built utilizing the latest web technologies, it features robust authentication, fast responsiveness, AI integration, and a highly polished user interface.

## ✨ Key Features

*   **Anonymous Messaging Architecture**: Communicate freely with complete privacy.
*   **Secure Authentication**: Comprehensive user management and session handling utilizing NextAuth.js and bcrypt for secure password hashing.
*   **Automated Email Workflows**: Seamless email verification, onboarding, and notifications using Resend and React Email.
*   **Strict Data Validation**: End-to-end type safety and form validation enforced by Zod and React Hook Form.
*   **Modern, Responsive UI**: A beautiful, accessible, and responsive dark/light mode interface crafted with Tailwind CSS v4, Shadcn UI, Base UI, and Lucide React icons.
*   **Robust Database**: Scalable and efficient data modeling using MongoDB and Mongoose.

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (React 19)
*   **Database**: MongoDB (Mongoose ORM)
*   **Authentication**: NextAuth.js
*   **Styling**: Tailwind CSS v4, Shadcn UI, Base UI
*   **Forms & Validation**: React Hook Form, Zod
*   **Email**: Resend, React Email

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v20+) and npm installed on your machine. You will also need a MongoDB database cluster (e.g., MongoDB Atlas).

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/octo-chat.git](https://github.com/yourusername/octo-chat.git)
    cd octo-chat
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env.local` file in the root directory and configure the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret_key
    NEXTAUTH_URL=http://localhost:3000
    RESEND_API_KEY=your_resend_api_key
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
