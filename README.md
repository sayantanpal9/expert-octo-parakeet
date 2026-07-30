\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{hyperref}
\usepackage{geometry}
\geometry{a4paper, margin=1in}

\title{\textbf{Octo Chat} \\ \large Anonymous Chatting Application}
\author{Sayantan Pal}
\date{}

\begin{document}
\maketitle

\section*{Overview}
Octo Chat is an anonymous chatting platform built on top of Next.js 16. It leverages modern full-stack web technologies to provide a secure and robust anonymous communication environment.

\section*{Tech Stack}
\begin{itemize}
    \item \textbf{Framework:} Next.js (React 19)
    \item \textbf{Database \& ORM:} MongoDB with Mongoose
    \item \textbf{Authentication \& Security:} NextAuth.js, Bcrypt
    \item \textbf{UI \& Styling:} Tailwind CSS v4, Shadcn UI, Base UI, Lucide React
    \item \textbf{Forms \& Validation:} React Hook Form, Zod
    \item \textbf{Email Services:} Resend, React Email
    \item \textbf{AI Integration:} Vercel AI SDK (OpenAI)
\end{itemize}

\section*{Key Features}
\begin{itemize}
    \item Secure, anonymous messaging architecture.
    \item Robust user authentication and secure password hashing.
    \item Strict form validation and schema checking using Zod.
    \item Automated email verification and notifications powered by Resend.
    \item Integrated AI capabilities utilizing the OpenAI API.
    \item Fully responsive user interface with dark and light theme support.
\end{itemize}

\section*{Local Development Setup}
\begin{enumerate}
    \item Clone the repository to your local machine:
    \item Install all necessary dependencies: \texttt{npm install}
    \item Configure the required environment variables (e.g., MongoDB URI, NextAuth secret, Resend API key, and OpenAI API key) in a \texttt{.env} file.
    \item Start the development server: \texttt{npm run dev}
\end{enumerate}

\end{document}
