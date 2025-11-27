<h1 align="center">
  EventFusion ✨
</h1>

<p align="center">
  EventFusion is a dynamic, full-stack event management platform built with Next.js.
</p>

<!-- <table align="center">
  <tr>
    <th>Login Page</th>
    <th>Register Page</th>
  </tr>
  <tr>
    <td align="center">
      <img src="./loginPage_ss.png" alt="Login Page">
    </td>
    <td align="center">
      <img src="./registerPage_ss.png" alt="Register Page">
    </td>
  </tr>
</table> -->

## 🔋 Features

- 🏠 **Home Page**: Displays a dynamic list of events, allowing users to browse upcoming and featured events easily.
- 🔑 **API Routes**: Create, update, delete, and fetch events from the database with functional endpoints.
- ☁️ **Cloudinary Integration**: Upload and manage images using the Cloudinary SDK.
- 🎫 **Event Details Page**: Shows detailed event information with registration and similar event recommendations.

## ⚙️ Tech Stack

- ⚛️ **Framework**: Next.js
- 🎨 **Styling**: Tailwind CSS
- 📘 **Language**: TypeScript
- 💾 **Database**: MongoDB, Mongoose
- ☁️ **Cloud Storage**: Cloudinary

## 🤸 Quick Start

Steps to set up the project on a local machine:

### ⚠️ Prerequisites

- Git
- Node.js
- npm (Node Package Manager)

### 📦 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/soumadip-dev/EventFusion-NextJs.git
cd EventFusion-NextJs
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000/

MONGODB_URI=
CLOUDINARY_URL=
```

Replace the placeholder values with your actual credentials.

#### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
