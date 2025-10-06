from rest_framework import serializers
from .models import Invoice, InvoiceItem
from transactions.models import Transaction


class InvoiceItemSerializer(serializers.ModelSerializer):
    line_total = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = InvoiceItem
        fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']


class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = ['id', 'reference', 'customer_name', 'customer_email', 'status', 'total', 'items', 'created_at']
        read_only_fields = ['status', 'total', 'created_at']

    def validate_items(self, value):
        if not value or len(value) == 0:
            raise serializers.ValidationError('Invoice must have at least one item')
        return value

    def validate_total(self, value):
        if value < 0:
            raise serializers.ValidationError('Total cannot be negative')
        return value

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        # compute total
        total = 0
        for it in items_data:
            line = it.get('quantity', 1) * it.get('unit_price')
            total += line

        validated_data['total'] = total
        invoice = Invoice.objects.create(**validated_data)
        for it in items_data:
            InvoiceItem.objects.create(invoice=invoice, **it)

        # create Sale transaction
        Transaction.objects.create(invoice_reference=invoice.reference, type=Transaction.TYPE_SALE, amount=invoice.total)
        return invoice
