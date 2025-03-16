<<<<<<< HEAD
# INTERN-INTELLIGENCE
Full-Stack Development Virtual Internship at Intern Intelligence.
=======
# **Zion - Cyberpunk Movie Discovery Platform** 🚀🎬

## **Project Overview**

Zion Movies is a futuristic **movie discovery platform** designed with a **cyberpunk aesthetic**, integrating real-time movie data from **The Movie Database (TMDB) API**. The platform allows users to **browse, filter, search, and view detailed information about movies**, all wrapped in a **retro-futuristic, neon-lit UI**.

## **Features** 🔥

✅ **Home Page** – Showcases **popular, action, sci-fi, horror, and thriller** movies fetched from TMDB.
✅ **Movie Details Page** – Displays **detailed movie info**, including genre, rating, release year, description, and a direct **YouTube trailer search**.
✅ **Movie List Page** – Users can **filter movies by genre** and **sort them** by popularity, release date, or alphabetical order.
✅ **Search Page** – A dedicated **search bar** that retrieves and displays movies matching the user’s query.
✅ **Scroll-to-Top Button** – Smooth navigation for better UX.
✅ **Cyberpunk UI/UX Design** – **Neon glow, glitch effects, pixel elements, and retro aesthetics** create an immersive cyber-futuristic experience.

## **Tech Stack** 💻

### **Frontend:**

- HTML5
- CSS3 (Cyberpunk UI with Neon & Glitch Effects)
- JavaScript (AJAX for dynamic search & updates)

### **Backend:**

- Django (Python)
- Django REST Framework (API setup for data handling)
- TMDB API (for fetching real-time movie data)

## **Installation & Setup** ⚙️

### **Prerequisites**

- Python 3.8+
- Django 4+
- A valid TMDB API Key
- A virtual environment (recommended)

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/zion-movies.git
cd zion-movies
```

### **2. Create & Activate a Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate    # Windows
```

### **3. Install Dependencies**

```bash
pip install -r requirements.txt
```

### **4. Set Up Environment Variables**

Create a `.env` file in the project root and add:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

### **5. Run the Django Server**

```bash
python manage.py runserver
```

### **6. Open in Browser** 🌐

Visit: `http://127.0.0.1:8000/`

## **Project Structure** 📂

```
zion-movies/
│── movies/               # Main Django app
│   ├── static/           # Static files (CSS, JS, images)
│   ├── templates/        # HTML Templates
│   ├── views.py          # Django Views
│   ├── urls.py           # URL Routing
│   ├── models.py         # (Not used, TMDB API is the data source)
│── static/js/            # JavaScript files
│── static/css/           # CSS styles
│── templates/            # HTML Templates
│── manage.py             # Django entry point
│── README.md             # Project Documentation
│── requirements.txt      # Dependencies
```

## **API Integration** 🔗

- **TMDB API** – Used for fetching movie data in real time.
- **Endpoints Used:**
  - `https://api.themoviedb.org/3/movie/popular`
  - `https://api.themoviedb.org/3/discover/movie?with_genres=<genre_id>`
  - `https://api.themoviedb.org/3/search/movie?query=<movie_name>`

## **Potential Features & Improvements For Future** 🚀

- **User Authentication & Favorites System** (Save favorite movies)
- **Personalized Movie Recommendations**

## **Credits & Acknowledgments** 🎖️

Developed as part of the **Intern Intelligence Full-Stack Development Virtual Internship**.

Made with 💙 by [BABAYEV MURAD] | LinkedIn: [[MURAD BABAYEV](https://www.linkedin.com/in/mbabayev/)] | GitHub: [[XENOPHIR](https://github.com/XENOPHIR)]

---
📽 **Experience the Future of Movie Discovery!** 🚀
>>>>>>> 28dfdc5 (Initial commit: Upload INTERN-INTELIGENCE project)
