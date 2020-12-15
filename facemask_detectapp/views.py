from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from facemask_detectapp.models import *
import json
from facemask_detectapp.utils import detect_mask_image,detect_mask_video
import base64,io
import cv2
from django.conf import settings


# Create your views here.
def detect_facemask(request):
    return render(request, "faceMask_detect.html")


def dashboard(request):
    return render(request, "index.html")


def detectImage(request):
    return render(request, "facemask_image.html")


def detectVideo(request):
    return render(request, "facemask_video.html")

def upload(request):
    if request.method == 'POST':
        if request.is_ajax():
            image = request.FILES.get('img')
            uploaded_image = Photo.objects.create(img=image)
            uploaded_image.save()
            response_data = {
                'url': uploaded_image.img.url,
            }
    return HttpResponse(json.dumps(response_data))


def display_detectedImage(request):
    print(request.GET.get("sel_img"),'sd')
    if request.GET.get("sel_img")!="":
        imagedata = detect_mask_image.main(request.GET.get("sel_img"))
        print(imagedata,'sdsd')
        ret, frame_buff = cv2.imencode('.png', imagedata['image'])  # could be png, update html as well
        frame_b64 = base64.b64encode(frame_buff)
        print(imagedata['label'],'label data')
        # Note this was fixed to be one dict with the context variables
        return HttpResponse(frame_b64)
    else:
        return HttpResponse("No image is uploaded")


def display_Capturedvideo(request):
    videodata = detect_mask_video.predict_framedata()
    video_url = settings.STATIC_URL+'videos/output.mp4'
    print(videodata,'jjj')
    return HttpResponse(json.dumps({"url":video_url}))
