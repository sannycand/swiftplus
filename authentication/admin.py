from django.contrib import admin
from .models import (
                        Account,
                    )

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'first_name', 'last_name', 'created_at')

admin.site.register(Account, UserAdmin)