# AI Image & Video Generator System

A full-stack AI-powered image and video generation platform built with **Next.js, React, TypeScript, MongoDB, MUI, and Zustand**.

> **Note:** The application is currently under development. The deployed version is primarily used for testing the production environment and demonstrating the application's architecture and user/admin flows.

## 🚀 Live Demo

**Production:**
https://ai-image-video-generator-system-three.vercel.app/

You can use the deployed application to explore the authentication flow, AI generation interface, dashboard, credit system, and other application features.

## ✨ Features

- 🔐 User authentication and authorization
- 👤 User and admin roles
- 🎨 AI image generation interface
- 🎬 AI video generation interface
- 🤖 Multiple AI model selection
  - GPT
  - Gemini
  - Claude

- 📐 Multiple aspect ratios
  - 16:9
  - 1:1
  - 9:16
  - 4:3

- 💳 Credit-based generation system
- 📊 Admin analytics dashboard
- 📈 Generation analytics and activity tracking
- 🖼️ Generation history
- ⚡ Server Actions with Next.js App Router
- 🗃️ MongoDB database with Mongoose
- 🎨 Material UI-based dark interface
- 🔄 Zustand for client-side state management
- 📱 Responsive design
- ☁️ Production deployment with Vercel

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Material UI (MUI)
- Zustand
- Recharts

### Backend

- Next.js Server Actions
- MongoDB
- Mongoose
- JWT-based authentication

### Deployment

- Vercel
- MongoDB

## 📁 Project Structure

```text
app/
├── (public)/
│   ├── login/
│   ├── signup/
│   └── ...
│
├── (protected)/
│   ├── create/
│   └── ...
│
└── admin/
    ├── dashboard/
    └── ...

feature/
├── auth/
├── create/
└── ...

components/
├── Navbar/
├── shared/
└── ...

models/
├── User.ts
├── Generate.ts
└── ...

lib/
├── Mongodb.ts
├── getCurrentUser.ts
└── ...

store/
└── useCreateStore.ts
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kritagyatimsina023/Ai-image---video-generator-system.git
```

### 2. Navigate into the project

```bash
cd Ai-image---video-generator-system
```

### 3. Install dependencies

Using pnpm:

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000

# Add your AI provider API keys when integrating the generation APIs
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

> The exact environment variables required may depend on the currently implemented configuration of the project.

### 5. Start the development server

```bash
pnpm dev
```

Or:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔐 Authentication

The application supports authenticated users and role-based access.

Users can:

- Create an account
- Log in
- Access the generation workspace
- View their generation history
- Manage their available credits

Administrators have access to additional analytics and management functionality.

## 📊 Admin Dashboard

The admin dashboard provides analytics such as:

- Total generations
- Image generations
- Video generations
- Generation changes
- Peak generation hour
- Generation requests per hour
- Most requested generation type
- Average requests per hour
- Total credits consumed

The dashboard is designed to demonstrate how an AI-generation platform could monitor usage and platform activity.

## 💳 Credit System

The application uses a credit-based system for generation requests.

Credits can be consumed based on the type of generation requested, allowing the platform to control AI-generation usage and provide a foundation for future subscription/payment integration.

## 🤖 AI Generation Status

The current deployed version is primarily a **production-environment demonstration**.

The AI generation providers are not currently enabled for actual production generation. Therefore, the generated image/video results shown in the application may use **dummy/demo media** to demonstrate the complete application flow.

The architecture is designed so that actual AI providers can be integrated into the generation workflow later.

## 🎯 Purpose of the Project

This project was built to demonstrate a production-style full-stack AI application architecture, including:

- Authentication
- Authorization
- Role-based access
- Database integration
- Credit management
- AI generation workflow
- Generation history
- Admin analytics
- Responsive UI
- Production deployment

It also demonstrates how an AI-generation platform can be structured before connecting the final AI inference providers.

## 🚀 Deployment

The application is deployed using **Vercel**.

Live application:

https://ai-image-video-generator-system-three.vercel.app/login

## 📚 Learn More

To learn more about Next.js:

- https://nextjs.org/docs
- https://nextjs.org/learn

Next.js repository:

https://github.com/vercel/next.js

## 👨‍💻 Author

**Kritagya Timsina**

Computer Engineering Student | Frontend & Full-Stack Developer

Focused on building applications using:

`React` · `Next.js` · `TypeScript` · `Node.js` · `MongoDB` · `MUI` · `AI APIs`
