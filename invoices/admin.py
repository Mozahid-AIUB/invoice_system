from django.contrib import admin
from .models import Invoice, InvoiceItem


class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 0


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('reference', 'customer_name', 'status', 'total', 'created_at')
    inlines = [InvoiceItemInline]
from django.contrib import admin

# Register your models here.
