# Artishare — Frontend

**Artishare** is a Medium-style publishing platform for writers and readers. This is the frontend repository, built with modern technologies to deliver a clean and responsive user experience.

## ✨ Features

- Rich-text editor powered by [Tiptap](https://tiptap.dev/)
- Responsive and user-friendly interface
- Article publishing and editing
- User authentication (connected to backend)
- Article feeds and author profiles

## Tech Stack

- **Next.js**
- **Tiptap** for rich-text editing
- **Tailwind CSS**

> Looking for the backend? Check it out [here](https://github.com/ibrahimGoumrane/artishare-backend)  

---

## Getting Started

Follow these instructions to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/artishare-frontend.git
cd artishare-frontend
```

### 2. Install dependencies


```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and set your backend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```
Replace **http://localhost:5000/api** with your actual backend URL if different.


### 4. Start the development server
```bash
npm run dev
```
The app should now be running at **http://localhost:3000**.
