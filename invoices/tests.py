from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from transactions.models import Transaction


User = get_user_model()


class InvoiceAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='tester', password='pass123')
        resp = self.client.post(reverse('token_obtain_pair'), {'username': 'tester', 'password': 'pass123'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_invoice_creates_sale_transaction(self):
        url = reverse('invoice-list')
        payload = {
            'reference': 'INV-001',
            'customer_name': 'Alice',
            'items': [
                {'description': 'Item A', 'quantity': 2, 'unit_price': '10.00'},
                {'description': 'Item B', 'quantity': 1, 'unit_price': '5.00'},
            ]
        }
        resp = self.client.post(url, payload, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        # check transaction
        tx = Transaction.objects.filter(invoice_reference='INV-001', type=Transaction.TYPE_SALE).first()
        self.assertIsNotNone(tx)
        self.assertEqual(str(tx.amount), '25.00')

    def test_pay_invoice_creates_payment_and_updates_status(self):
        # create invoice first
        url = reverse('invoice-list')
        payload = {
            'reference': 'INV-002',
            'customer_name': 'Bob',
            'items': [
                {'description': 'Item X', 'quantity': 1, 'unit_price': '15.00'},
            ]
        }
        resp = self.client.post(url, payload, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        invoice_id = resp.data['id']

        pay_url = reverse('invoice-pay', args=[invoice_id])
        resp2 = self.client.post(pay_url, {}, format='json')
        self.assertEqual(resp2.status_code, status.HTTP_200_OK)
        # confirm payment tx
        tx = Transaction.objects.filter(invoice_reference='INV-002', type=Transaction.TYPE_PAYMENT).first()
        self.assertIsNotNone(tx)
        self.assertEqual(str(tx.amount), '15.00')
        self.assertEqual(resp2.data['status'], 'paid')

    def test_cannot_create_invoice_without_items(self):
        url = reverse('invoice-list')
        payload = {
            'reference': 'INV-003',
            'customer_name': 'Carol',
            'items': []
        }
        resp = self.client.post(url, payload, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
from django.test import TestCase

# Create your tests here.
