const TMDB_API_KEY = 'YOUR_KEY';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", function () {
        searchMovies();
    });

    // Поиск по нажатию Enter
    document.getElementById("search-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMovies();
        }
    });
});

function searchMovies() {
    const query = document.getElementById("search-input").value.trim();

    if (!query) {
        alert("❌ Please enter a movie title!");
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => console.error("❌ Error fetching search results:", error));
}

function displaySearchResults(movies) {
    const container = document.getElementById("movies-container-search");

    if (!container) {
        console.error("❌");
        return;
    }

    container.innerHTML = "";
    if (movies.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        return;
    }

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

    console.log("✅");
}
