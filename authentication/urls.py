from django.conf.urls import patterns, include, url

from rest_framework_nested import routers as nested_routers

from authentication.api import AccountViewSet, LoginView, LogoutView

from posts.api import AccountPostsViewSet, PostViewSet


router = nested_routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)

accounts_router = nested_routers.NestedSimpleRouter(router, r'accounts', lookup='account')
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^', include(accounts_router.urls)),

    url(r'^auth/login/$', LoginView.as_view(), name='login'),
    url(r'^auth/logout/$', LogoutView.as_view(), name='logout')
)