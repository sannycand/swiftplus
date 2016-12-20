from django.conf.urls import url, include
from django.contrib import admin
from authentication.views import IndexView

from authentication import urls as authentication_url

api_urlpatterns = []
api_urlpatterns += authentication_url.urlpatterns

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(api_urlpatterns, namespace='api')),
    url('^.*$', IndexView.as_view(), name='index')
]
