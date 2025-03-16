const TMDB_API_KEY = 'YOUR_KEY';

document.addEventListener("DOMContentLoaded", function () {
    fetchMovies();

    document.getElementById("apply-filters-movies").addEventListener("click", function () {
        fetchMovies();
    });
});

function fetchMovies() {
    const genre = document.getElementById("genre-filter-movies").value;
    const sort = document.getElementById("sort-filter-movies").value;
    
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=${sort}`;

    if (genre) {
        url += `&with_genres=${genre}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error("❌ Error fetching movies:", error));
}

function displayMovies(movies) {
    const container = document.getElementById("movies-container-page");
    
    if (!container) {
        console.error("❌");
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

    console.log("✅ Фильмы загружены!");
}
