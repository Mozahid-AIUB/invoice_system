from django.db import models
from django.core.validators import MinValueValidator


class Transaction(models.Model):
    TYPE_SALE = 'sale'
    TYPE_PAYMENT = 'payment'
    TYPE_CHOICES = [
        (TYPE_SALE, 'Sale'),
        (TYPE_PAYMENT, 'Payment'),
    ]

    invoice_reference = models.CharField(max_length=64)
    type = models.CharField(max_length=16, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} {self.amount} for {self.invoice_reference}"
from django.db import models

# Create your models here.
