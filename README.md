# Progressify

A full-stack developer learning management platform that helps students organize learning resources, track consistency, and discover curated content from multiple platforms.

🌐 Live Demo: [Progressify Live](https://progressify-nine.vercel.app/?utm_source=chatgpt.com)

---

## Overview

Most students consume learning content from multiple platforms — YouTube playlists, coding websites, blogs, GitHub repos, Reddit discussions, and online courses.

Progressify brings everything together into one personalized dashboard where users can:

* Save and manage learning resources
* Track coding consistency
* Monitor GitHub and LeetCode activity
* Discover curated courses and playlists
* Explore community-recommended resources

The goal is simple:

> Organize learning. Track progress. Stay consistent.

---
## Features

### Authentication

* JWT-based authentication
* Secure login and registration
* Persistent user sessions

### Personalized Dashboard

* GitHub contribution tracking
* LeetCode statistics
* Daily activity heatmap
* Learning consistency insights

### Course Management

* Save YouTube videos and playlists
* Add custom learning resources
* Organize courses in one place
* Quick access dashboard

### Learning Discovery

* Search curated learning content
* YouTube video + playlist recommendations
* Reddit community recommendations
* AI-generated summaries

### Activity Tracking

* Logs daily learning activity
* Heatmap visualization
* Progress monitoring

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### APIs & Integrations

* GitHub API
* LeetCode API
* YouTube API
* Reddit API

---

## Architecture

```txt id="e5ys2l"
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

## Folder Structure

```txt id="pmj2zg"
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

## Installation

### Clone the repository

```bash id="mn0v4m"
git clone https://github.com/ananya324/Progressify.git
cd progressify
```

---

## Backend Setup

```bash id="w7fl9v"
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash id="wlc0wz"
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env id="sfx8jv"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

YOUTUBE_API_KEY=your_api_key
GITHUB_TOKEN=your_github_token
```

---

## Future Improvements

* Smart learning roadmaps
* View AI-generated learning summaries
* AI-generated study plans
* Learning streak system
* Chrome extension support
* Better analytics
* Mobile responsiveness improvements
* Social features
* Progress predictions

---

## Challenges Faced

* Integrating multiple third-party APIs
* Handling inconsistent external API responses
* Designing scalable backend architecture
* Managing async data efficiently in React
* Building reusable UI components

---

## What I Learned

* REST API architecture
* Authentication and authorization
* API integration
* State management
* Full-stack deployment
* Backend structuring
* Real-world debugging

---

## Deployment

Frontend deployed on:

* [Vercel](https://vercel.com?utm_source=chatgpt.com)

Backend:

* Node.js + Express API

Database:

* [MongoDB Atlas](https://www.mongodb.com/atlas?utm_source=chatgpt.com)

---


