from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from invoices.views import InvoiceViewSet
from transactions.views import TransactionViewSet
from backend.root import root_redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.views.generic import TemplateView

# Swagger
schema_view = get_schema_view(
    openapi.Info(title="Invoice API", default_version='v1'),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', root_redirect),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Catch-all route for React frontend
urlpatterns += [
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]
