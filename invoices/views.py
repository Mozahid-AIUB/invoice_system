from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer
from transactions.models import Transaction


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by('-created_at')
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # creation handled in serializer (including sale transaction)
        serializer.save()

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        invoice = self.get_object()
        if invoice.status != Invoice.STATUS_PENDING:
            return Response({'detail': 'Invoice is not pending and cannot be paid.'}, status=status.HTTP_400_BAD_REQUEST)

        # create payment transaction
        Transaction.objects.create(invoice_reference=invoice.reference, type=Transaction.TYPE_PAYMENT, amount=invoice.total)
        invoice.status = Invoice.STATUS_PAID
        invoice.save()
        serializer = self.get_serializer(invoice)
        return Response(serializer.data)
from django.shortcuts import render

# Create your views here.
