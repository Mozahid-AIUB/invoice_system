from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class TransactionAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='txuser', password='pass123')
        resp = self.client.post(reverse('token_obtain_pair'), {'username': 'txuser', 'password': 'pass123'}, format='json')
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_list_transactions_empty(self):
        url = reverse('transaction-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
from django.test import TestCase

# Create your tests here.
