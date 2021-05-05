
from django.urls import path
from .views import TopicView,ProfileView,ContentListCreateView,ProfileRetUpdateView,ContentUpdateView,SubjectListCreateView,SubjectUpdateView,Getdata,Filesdata,fileone


urlpatterns = [
   path('',TopicView.as_view()),
   path('profile/',ProfileView.as_view()),
   path('profile/<int:pk>',ProfileRetUpdateView.as_view()),
   path('contentrestriction/',ContentListCreateView.as_view()),
   path('contentrestriction/<int:pk>',ContentUpdateView.as_view()),
   path('subjectdet/',SubjectListCreateView.as_view()),
   path('subjectdet/<int:pk>/',SubjectUpdateView.as_view()), 
   path('getdata/',Getdata,name="getdata"), 
   path('file/',Filesdata),
   path('file/<pk>/',fileone),


]
