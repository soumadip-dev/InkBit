<h1 align="center">InkBit ✍️</h1>

<p align="center">
  A dynamic blog-sharing platform built with Next.js, featuring modern design, seamless publishing, and community engagement.
</p>

<div align="center">
  <img src="./public/banner.png" alt="Banner" width="900">
</div

---

## 🔋 Features

- 🔐 **Secure authentication** with Convex and role-based access
- ⚡ **Real-time updates** for posts and comments
- 📝 **Create blog posts** with image upload
- 📚 **View all posts** and **single post pages**
- 💬 **Create and view comments** per post
- 🔍 **Search and filter** blog posts
- 🎨 **Modern UI** using Shadcn UI and Tailwind CSS
- 🌙 **Dark & Light mode** with system preference
- 📱 **Fully responsive** on all devices
- 🚀 **Full-stack TypeScript** with end-to-end type safety

## ⚙️ Tech Stack

- **🎨 Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **🛠 Backend & Database**: Convex (Backend as a Service)
- **🎭 UI Components**: Shadcn UI, Radix UI Primitives
- **📦 Package Manager**: Bun
- **🔐 Authentication**: Convex Auth
- **🎨 Icons**: Lucide React
- **🔄 State Management**: Convex state management

## 🤸 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/soumadip-dev/InkBit.git
cd InkBit
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
CONVEX_DEPLOYMENT=<YOUR_CONVEX_DEPLOYMENT_NAME>
NEXT_PUBLIC_CONVEX_URL=<YOUR_CONVEX_DEPLOYMENT_URL>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Convex Setup

```bash
# Login to Convex
bunx convex login

# Deploy your Convex backend
bunx convex dev

# Or deploy to production
bunx convex deploy
```

### 5. Run the Application

```bash
# Development mode
bun dev

# Build for production
bun build

# Start production server
bun start
```
