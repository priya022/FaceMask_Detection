from django.urls import path
from . import views

urlpatterns = [
    path('facemask',views.detect_facemask, name='detect_facemask' ),
    path('', views.dashboard, name='dashboard'),
    path('upload/', views.upload, name='upload'),
    path('display_detectedImage/',views.display_detectedImage,name='display_detectedImage'),
    path('display_Capturedvideo/',views.display_Capturedvideo,name='display_Capturedvideo'),
    path('detectImage', views.detectImage, name='detectImage'),
    path('detectVideo', views.detectVideo, name='detectVideo')
]