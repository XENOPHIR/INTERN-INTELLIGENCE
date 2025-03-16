from django.urls import path
from .views import MovieListAPIView, MovieDetailAPIView, MovieSearchAPIView, TMDBMovieListAPIView, SaveTMDBMoviesAPIView
from .views import index, movies, search, movie_detail
from movies.views import *

urlpatterns = [
    path('movies/<int:pk>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path("tmdb/movie/<int:movie_id>/", TMDBMovieDetailAPIView.as_view(), name="tmdb-movie-detail"),
    path('tmdb/save-movies/', SaveTMDBMoviesAPIView.as_view(), name='save-tmdb-movies'),
    path('', index, name='index'),
    path('movies/', movies, name='movies'),
    path('search/', search, name='search'),
    path('movie/<int:movie_id>/', movie_detail, name='movie-detail'),
]