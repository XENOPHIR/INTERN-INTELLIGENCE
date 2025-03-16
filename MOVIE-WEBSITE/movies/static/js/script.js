const TMDB_API_KEY = 'YOUR_KEY'

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("movies-container-popular")) {
        console.log("✅ ...");
        fetchMovies();
        fetchMoviesByGenre(28, "movies-container-action");
        fetchMoviesByGenre(878, "movies-container-scifi");
        fetchMoviesByGenre(27, "movies-container-horror");
        fetchMoviesByGenre(53, "movies-container-thriller");

        setTimeout(setupScrollButtons, 1000);
    } else {
        console.log("🎬 ...");
        const movieId = getMovieIdFromURL();
        if (movieId) {
            fetchMovieDetails(movieId);
        } else {
            console.error("❌ `movieId`");
        }
    }
});

function fetchMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results, "movies-container-popular");
        })
        .catch(error => console.error("ERROR:", error));
}

function fetchMoviesByGenre(genreId, containerId) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`)
        .then(response => response.json())
        .then(data => {
            console.log(`RESPONSE ${containerId}:`, data);
            if (data.results) {
                displayMovies(data.results, containerId);
            } else {
                console.error(`ERROR IN API:`, data);
            }
        })
        .catch(error => console.error(`LOADING ERROR ${containerId} OF MOVIES:`, error));
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`❌ '${containerId}'`);
        return;
    }

    container.innerHTML = ""; 
    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date || "Unknown Date"}</p>
            <a href="/movie/${movie.id}/" class="neon-button">View Details</a>
        `;

        container.appendChild(movieElement);
    });

    console.log(`✅ '${containerId}'!`);
}

function setupScrollButtons() {
    document.querySelectorAll(".scroll-buttons").forEach(section => {
        const container = section.querySelector(".movies-grid");
        const leftButton = section.querySelector(".scroll-left");
        const rightButton = section.querySelector(".scroll-right");

        leftButton.addEventListener("click", function () {
            container.scrollBy({ left: -300, behavior: "smooth" });
        });

        rightButton.addEventListener("click", function () {
            container.scrollBy({ left: 300, behavior: "smooth" });
        });
    });
}
// ----------------------------------------------------------------------------
// === MOVIE DETAILS ===
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("movie-title")) {
        const movieId = getMovieIdFromURL();
        if (movieId) {
            fetchMovieDetails(movieId);
        } else {
            console.error("❌ ERROR `movieId` NOT FOUND.");
        }
    }
});

function getMovieIdFromURL() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 2] || pathParts.pop();
}

function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(movie => {
            if (movie.status_code) {
                console.error("ERROR TMDB API:", movie.status_message);
                return;
            }

            document.title = `${movie.title} - Zion Movies`;
            document.getElementById("movie-title").innerText = movie.title;
            document.getElementById("movie-year").innerText = `Year: ${movie.release_date.split("-")[0]}`;
            document.getElementById("movie-genre").innerText = `Genre: ${movie.genres.map(g => g.name).join(", ")}`;
            document.getElementById("movie-overview").innerText = movie.overview;
            document.getElementById("movie-rating").innerText = movie.vote_average.toFixed(1);
            document.getElementById("movie-poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            document.querySelector(".background-overlay").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

            document.getElementById("watch-trailer").addEventListener("click", function () {
                window.open(`https://www.youtube.com/results?search_query=${movie.title} trailer`, "_blank");
            });
        })
        .catch(error => console.error("ERROR TMDB:", error));
}

function scrollToMovies() {
    document.getElementById("movies-container-popular").scrollIntoView({ behavior: "smooth" });
}

function scrollToAction() {
    document.getElementById("movies-container-action").scrollIntoView({ behavior: "smooth" });
}

function scrollToHorror() {
    document.getElementById("movies-container-horror").scrollIntoView({ behavior: "smooth" });
}

function scrollToSciFi() {
    document.getElementById("movies-container-scifi").scrollIntoView({ behavior: "smooth" });
}

function scrollToThriller() {
    document.getElementById("movies-container-thriller").scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
}