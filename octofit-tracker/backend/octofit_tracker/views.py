from rest_framework import viewsets, permissions
from .models import User, Team, Workout, Activity, Leaderboard
from .serializers import UserSerializer, TeamSerializer, WorkoutSerializer, ActivitySerializer, LeaderboardSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all().order_by('-score')
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
