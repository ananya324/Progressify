# Progressify

A full-stack learning management platform where students can organize learning resources from different platforms in one place.

🌐 Live Demo: [Progressify Live](https://progressify-nine.vercel.app/?utm_source=chatgpt.com)

---

# Overview

Students often learn from multiple platforms like YouTube playlists, coding websites, GitHub repositories, Reddit discussions, and online courses.

Progressify helps centralize everything into a single personalized dashboard where users can save, organize, and track their learning journey efficiently.

One of the core features is the **Quick Save** option, which allows users to instantly save any learning resource URL into their **My Courses** section. This makes it easy to manage resources from different platforms without losing track of them.

The platform also includes:

* JWT-based authentication
* Activity tracking
* GitHub and LeetCode integrations
* Curated resource discovery
* Learning consistency heatmaps

The dashboard displays:

* GitHub contribution activity
* LeetCode solved statistics
* Custom activity heatmaps for saved courses

Whenever a user accesses a course, the activity heatmap updates automatically to help track learning consistency and engagement over time.

Progressify also includes a **Discover** section where users can search for learning content. Currently, it fetches:

* YouTube videos
* YouTube playlists
* Related Reddit discussions

This helps users explore recommended resources and community insights around any topic.

The long-term vision is to expand discovery by integrating platforms like Google Search, Udemy, and Coursera, along with smarter recommendation systems and AI-powered learning roadmaps.

---

# Features

## Authentication

* JWT-based authentication
* Secure login and registration
* Persistent user sessions

---

## Personalized Dashboard

* GitHub contribution tracking
* LeetCode solved statistics
* Daily learning activity heatmap
* Learning consistency insights

---

## Course Management

* Quick Save learning resources using URLs
* Save YouTube videos and playlists
* Add custom learning resources
* Organize multiple resources in one place
* Easy access through My Courses dashboard

---

## Discover Learning Resources

* Search curated learning content
* Discover YouTube videos and playlists
* Explore Reddit community discussions
* Find topic-based recommendations

---

## Activity Tracking

* Tracks course access activity
* Updates learning heatmaps dynamically
* Helps users monitor learning consistency

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## APIs & Integrations

* GitHub API
* LeetCode API
* YouTube API
* Reddit API

---

# Architecture

```txt
Frontend (React + Vite)
        ↓
REST API (Express.js)
        ↓
MongoDB Database
        ↓
External APIs
(GitHub, LeetCode, YouTube, Reddit)
```

---

# Folder Structure

```txt
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── services/
├── config/

frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── context/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ananya324/Progressify.git
cd Progressify
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

YOUTUBE_API_KEY=your_api_key
GITHUB_TOKEN=your_github_token
```

---

# Future Improvements

* Google Search integration
* Udemy and Coursera integration
* Smart learning roadmaps
* AI-generated study plans
* Smarter recommendation engine
* Learning streak system
* Chrome extension support
* Better analytics
* Improved mobile responsiveness
* Social/community features

---

# Challenges Faced

* Handling inconsistent third-party API responses
* Managing asynchronous dashboard data efficiently
* Integrating multiple external APIs
* Designing scalable backend architecture
* Building reusable frontend components

---

# What I Learned

* Full-stack application architecture
* REST API development
* Authentication and authorization
* API integrations
* State management
* Async data handling
* Real-world debugging
* Deployment workflows

---

# Deployment

## Frontend

Deployed on:

* [Vercel](https://vercel.com/?utm_source=chatgpt.com)

---

## Backend

* Node.js + Express API

---

## Database

* [MongoDB Atlas](https://www.mongodb.com/atlas?utm_source=chatgpt.com)
