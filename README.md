# 🎬 Netflix Clone

A full-stack **Netflix clone** built with **React**, **Firebase**, and the **TMDB API**. This project replicates core Netflix features, including user authentication, movie browsing, watchlist management, and video playback.

---

## 🌟 Features

- **User Authentication**: Sign up and sign in using Firebase Authentication.
- **Browse Movies**: Display movies from the TMDB API, organized by categories.
- **Movie Details**: View detailed information about each movie.
- **Video Player**: Watch movie trailers.
- **Watchlist Management**: Add or remove movies from a personal watchlist, stored in Firebase Firestore.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Protected Routes**: Requires authentication to access content.
- **Real-time Updates**: Watchlist syncs across devices in real-time.

---

## 🛠️ Tech Stack

### Frontend

- React 18
- React Router DOM v6
- React Toastify (for notifications)
- CSS3 (custom styling)

### Backend & Services

- Firebase Authentication
- Firebase Firestore (database)
- TMDB API (movie data)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed or configured:

- Node.js (v14 or higher)
- npm or Yarn
- Firebase Account
- TMDB API Account

---

## 🔧 Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kannan-innovates/Netflix-Clone
   cd netflix-clone
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Firebase**

   - Go to the Firebase Console.
   - Create a new project.
   - Enable **Authentication** → Select **Email/Password**.
   - Create a **Firestore Database** → Start in **test mode**.
   - Get your Firebase config from **Project Settings**.

4. **Set Up TMDB API**

   - Visit the TMDB website.
   - Create an account.
   - Navigate to **Settings** → **API** → Request an **API Key**.
   - Copy your **API Read Access Token**.

5. **Create** `.env` **File**In the root directory, create a `.env` file and add the following:

   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # TMDB API Configuration
   VITE_TMDB_API_KEY=your_tmdb_bearer_token
   ```

6. **Configure Firestore Rules**In the Firebase Console → **Firestore Database** → **Rules**, replace the default with:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /user/{document} {
         allow read, write: if request.auth != null;
       }
       match /watchlist/{document} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
         allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
       }
     }
   }
   ```

7. **Run the Application**

   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
netflix-clone/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, icons, logos
│   ├── components/             # Reusable components
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   └── TitleCards/
│   ├── context/                # React Context
│   │   ├── AuthContext.jsx
│   │   └── WatchlistContext.jsx
│   ├── pages/                  # Page components
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── MovieDetail/
│   │   ├── Player/
│   │   └── Watchlist/
│   ├── firebase.js             # Firebase configuration
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Key Features Explained

### Authentication (Firebase Auth)

- Users can sign up with email and password.
- Login persists across sessions.
- Protected routes redirect unauthenticated users to the login page.

### Watchlist (Firestore)

- Add movies to a personal watchlist.
- Data is stored in Firebase Firestore and syncs across devices.
- Watchlist is unique to each user account.

### Movie Data (TMDB API)

- Fetches real movie data and images.
- Categories include Trending, Popular, Top Rated, and Upcoming.
- Movie details include ratings, runtime, genres, and budget.

---
