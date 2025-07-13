# Fix My City - Citizen Reporting Platform

A web application designed to empower citizens to report city infrastructure issues and enable administrators to efficiently manage and resolve these reports.

## Features

### User Features
- ✅ Secure registration and login
- 📝 Submit detailed complaints with descriptions and up to 5 images
- 📊 View personal complaint status and history
- 📱 Responsive design for all devices

### Admin Features
- 🔒 Secure admin login portal
- 📋 View all pending complaints in dashboard
- ✔️ Update complaint status to "Resolved"
- 📸 Upload proof images to validate completed work
- ⚡ Efficient complaint management system

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT Authentication
- Cloudinary Image Upload

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account for image storage

### Installation

#### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   npm install

3. Create .env file with required variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD=your_cloudinary_cloud_name
   CLOUDINARY_PRESET=your_cloudinary_upload_preset

4. Start the backend server:
   ```bash
   npm run dev

#### Front-End Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the frontend root:
   ```bash
   VITE_BACKEND_URL=http://localhost:5000
   VITE_CLOUDINARY_CLOUD=your_cloudinary_cloud_name
   VITE_CLOUDINARY_PRESET=your_cloudinary_upload_preset


4. Start the frontend development server:
   ```bash
   npm run dev


#### Folder Structure
root
│
├── backend/          # Express API and server code
├── frontend/         # React frontend with TailwindCSS
├── admin-panel/      # Admin dashboard (React/Vite)
├── README.md
├── .gitignore
└── package.json
