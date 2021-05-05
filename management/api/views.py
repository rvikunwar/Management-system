from django.shortcuts import render
from django.http import HttpResponse
from .serializer import TopicSerializer,ProfileSerializer,ContentSerializer,SubjectSerializer,FilesSerializer
from management.models import BatchDetails ,SubjectContent ,Files ,Profile
from rest_framework.generics import ListAPIView,RetrieveAPIView ,RetrieveUpdateAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from django.views.generic.edit import DeleteView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.parsers import JSONParser 


class TopicView(ListAPIView):
    serializer_class=TopicSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        queryset=BatchDetails.objects.all()
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        serializer = ContentSerializer(queryset, many=True)
        
        return Response(serializer.data)

class ContentUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class=ContentSerializer
    permission_classes=[IsAuthenticated]
   
    def get_queryset(self):
        queryset =BatchDetails.objects.filter(user=self.request.user)
        return queryset
    


class ProfileView(ListAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
       
        queryset =Profile.objects.filter(user=self.request.user)[0]
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)


class ProfileRetUpdateView(RetrieveUpdateAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        
        queryset =Profile.objects.filter(user=self.request.user)
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)


class ContentListCreateView(ListCreateAPIView):
    serializer_class=ContentSerializer
    permission_classes=[IsAuthenticated]


    def get_queryset(self):
        
        queryset =BatchDetails.objects.filter(user=self.request.user)
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        cont=[]
        for i in queryset:
            serializer = ContentSerializer(i)
            cont.append(serializer.data)

        return Response(cont)

  

class SubjectUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class=SubjectSerializer
    permission_classes=[IsAuthenticated]
    queryset =SubjectContent.objects.all()

    

class SubjectListCreateView(ListCreateAPIView):
    serializer_class=SubjectSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        queryset =BatchDetails.objects.filter(user=self.request.user)
        
        return queryset

    def list(self, request):
        queryset =self.get_queryset()
        cont=[]
        for i in queryset:
            queryset_1=SubjectContent.objects.filter(content_details=i)
            
           
            for x in queryset_1:
                serializer = SubjectSerializer(x)
            
                cont.append(serializer.data)

        return Response(cont)



@api_view(['POST','GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([AllowAny])
def Getdata(request):
    if request.method=='POST':
        dat=request.data
        queryset =BatchDetails.objects.filter(batch=dat['batch'],semester=int(dat['semester']),course=dat['course'],subject=dat['subject'])
        queryset_2=Profile.objects.filter(user=queryset[0].user)
        queryset_1=SubjectContent.objects.filter(content_details=queryset[0])
        s=[]
        s_1=[]
        for i in queryset_1: 
            ss=SubjectSerializer(i,partial=True)
            
            s.append(ss.data)
        for i in queryset_2:
            ss_1=ProfileSerializer(i,partial=True)
            s_1.append(ss_1.data)
        print(s_1,"pp")
        return Response([s,s_1])

    else:
        print("shj")
    return Response()

@api_view(['GET','POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([AllowAny])
def Filesdata(request):
    queryset =Files.objects.all()

    if request.method=='GET':
        s_1=[]
        for i in queryset:
           ss_1=FilesSerializer(i)
         
           s_1.append(ss_1.data)
        return Response(s_1)

    elif request.method == 'POST': 
      
        file_data = FilesSerializer(data=request.data,partial=True) 
        print(request.data)
        if file_data.is_valid(): 
            file_data.save() 
            return Response(file_data.data) 
        return Response(file_data.errors) 
    else:
        print("shj")
    return Response()

@api_view(['GET', 'PUT', 'DELETE'])
def fileone(request, pk):
    try: 
        file = Files.objects.get(pk=pk) 
    except: 
        return Response({'message': 'The file does not exist'}) 
 
    if request.method == 'GET': 
        file_data = FilesSerializer(file) 
        return Response(file_data.data) 
 
    
 
    elif request.method == 'DELETE': 
        file.delete() 
        return Response({'message': 'File was deleted successfully!'})
    

