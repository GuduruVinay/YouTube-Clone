# YouTube Clone

A Full-Stack video sharing platform built with the MERN stack (MongoDB, Express, React, Node.js). This application replicates key features of YouTube, including video uploading, playback, channel management, comments, likes, dislikes and subscriptions, wrapped in a modern, responsive UI with Dark Mode support.

## Features

### User Authentication

* **Sign In / Sign Up:** Secure JWT-based authentication.

### Video Management

* **Upload Video:** Upload video files and thumbnails.
* **Video Player:** Custom video player with play/pause and volume controls.
* **Video Metadata:** Add titles, descriptions, and tags.
* **Edit / Delete:** Full CRUD operations for videos owned by the user.

### Channel System

* **Create Channel:** Users can create their own channels.
* **Channel Page:** Dedicated page showing channel banner, avatar, description, and video list.
* **Subscribe:** Users can subscribe / unsubscribe to channels.
* **Edit Channel:** Update channel details and visuals.

### Interaction

* **Likes / Dislikes:** Interact with videos.
* **Comments:** Post, edit, and delete comments on videos.
* **Views:** Automatic view counting.

### UT / UX

* **Responsive Design:** Mobile-first approach using Tailwind CSS.
* **Dark / Light Mode:** Full theme support with local storage persistence.
* **Toast Notifications:** Real-time feedback using `react-hot-toast` for actions (success / error).
* **Loaders:** Smooth loading states for better UX.

## Tech Stack

### Frontend

* **React.js:** Component-based UI library.
* **Redux Toolkit:** State management (User, Video, Theme).
* **React Router DOM:** Client-side routing.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **Axios:** HTTP client for API requests.
* **Zod:** Schema validation for forms.
* **React Hot Toast:** Modern notification system.

### Backend

* **Node.js & Express.js:** RESTful API server.
* **MongoDB & Mongoose:** NoSQL database and Object Data Modeling.
* **JWT (JSON Web Token):** Secure authentication tokens.
* **Bcrypt.js:** Password hashing.

## Validation & Security

* **Zod:** It is used on the frontend to validate inputs for SignIn, SignUp, Video Uploads, Post Comment and Channel Creation.
* **JWT Authentication:** Secure user sessions using JSON Wen Tokens (stored in localStorage) to authenticate API requests via Bearer headers. User sessions are managed via Redux.
* **Route Protection:** Backend routes for delete/update verify that the user is the owner of the resource.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
* Node Package Manager (npm)
* Node.js
* MongoDB (Local or Atlas)

### Installation

### Clone the Repository
```bash
git clone https://github.com/GuduruVinay/YouTube-Clone.git
```

or download the ZIP manually and extract it.

### Backend Setup

Navigate to the server floder and install dependencies

```bash
cd server
npm install
```

Create a .env file the the server directory : (Already sent for this project evaluation)

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server :

```bash
npm start
```

### Frontend Setup

Navigate to the client folder and install dependencies.

```bash
cd ../client
npm install
```

Start the frontend development server :

```bash
npm run dev
```

Then open the local server link shown in the terminal, for example :

```bash
http://localhost:5173/
```

The YouTube Clone will now be running !

## GitHub Link

https://github.com/GuduruVinay/YouTube-Clone

## Mock Data

* **Avatar URL:** https://api.dicebear.com/7.x/avataaars/svg?seed=testuser
* **Banner URL:** https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1500&h=400&fit=crop

* **Video URL:** https://www.youtube.com/watch?v=S8lMTwSRoRg
* **Thumbnail URL:** https://i.ytimg.com/vi/n_Dv4JMiwK8/hqdefault.jpg
