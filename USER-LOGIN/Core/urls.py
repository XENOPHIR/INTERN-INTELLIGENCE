from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, LogoutView, login_page, logout_view

urlpatterns = [
    path("", login_page, name="login"),
    path("logout/", logout_view, name="logout"),
    path("api/login/", LoginView.as_view(), name="api-login"),
    path("api/logout/", LogoutView.as_view(), name="api-logout"),
]
