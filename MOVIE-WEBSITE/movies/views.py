from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Q
import requests
from django.conf import settings
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.views import APIView



# Create your views here.
class MovieListAPIView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
class MovieDetailAPIView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieSearchAPIView(generics.ListAPIView):
    serializer_class = MovieSerializer
    
    def qet_queryset(self):
        query = self.request.query_params.get('qeury', '')
        return Movie.objects.filter(Q(title_iconations=query) | Q(description_icontains=query))

class TMDBMovieListAPIView(APIView):
    """
    Fetches popular movies from TMDB API
    """
    def get(self, request, *args, **kwargs):
        tmdb_api_key = settings.TMDB_API_KEY
        url = f"https://api.themoviedb.org/3/movie/popular?api_key={tmdb_api_key}&language=en-US&page=1"

        # ✅ CORRECT: Use `requests.get()`, not `request.get()`
        response = requests.get(url)

        if response.status_code == 200:
            return Response(response.json())

        return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)
    
class SaveTMDBMoviesAPIView(APIView):
    """
    Fetches movies from TMDB and saves them to the local database
    """
    def get(self, request, *args, **kwargs):
        tmdb_api_key = settings.TMDB_API_KEY
        url = f"https://api.themoviedb.org/3/movie/popular?api_key={tmdb_api_key}&language=en-US&page=1"

        response = requests.get(url)
        if response.status_code == 200:
            movies = response.json().get("results", [])
            saved_movies = []

            for movie in movies:
                obj, created = Movie.objects.get_or_create(
                    title=movie["title"],
                    defaults={
                        "description": movie["overview"],
                        "release_date": movie["release_date"],
                        "poster_url": f"https://image.tmdb.org/t/p/w500{movie['poster_path']}",
                        "rating": movie["vote_average"]
                    }
                )
                if created:
                    saved_movies.append(obj)

            serializer = MovieSerializer(saved_movies, many=True)
            return Response({"saved_movies": serializer.data}, status=201)

        return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)

class TMDBMovieDetailAPIView(APIView):
    """
    Fetches movie details from TMDB API by movie_id
    """
    def get(self, request, movie_id, *args, **kwargs):
        tmdb_api_key = settings.TMDB_API_KEY
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&language=en-US"

        response = requests.get(url)

        if response.status_code == 200:
            return Response(response.json(), status=200)

        return Response({"error": "Failed to fetch movie details from TMDB"}, status=response.status_code)

def index(request):
    return render(request, "index.html")

def movies(request):
    return render(request, "movies.html")

def search(request):
    return render(request, "search.html")

def movie_detail(request, movie_id):
    return render(request, "movie_detail.html", {"movie_id": movie_id})