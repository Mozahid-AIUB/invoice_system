from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('invoice_reference', 'type', 'amount', 'created_at')
from django.contrib import admin

# Register your models here.
