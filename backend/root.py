from django.http import HttpResponseRedirect
from django.urls import reverse

def root_redirect(request):
    # Redirect to Swagger UI
    return HttpResponseRedirect(reverse('schema-swagger-ui'))