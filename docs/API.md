# 🌐 Documentação da API - Vytalle Estética

> **API REST completa para integração com ERPs, sistemas de vendas e aplicações externas**

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
- [Modelos de Dados](#modelos-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Rate Limiting](#rate-limiting)
- [Webhooks](#webhooks)
- [SDKs](#sdks)
- [Troubleshooting](#troubleshooting)
- [Códigos de Erro](#códigos-de-erro)

---

## 🎯 Visão Geral

A API do Vytalle Estética fornece acesso completo aos dados de produtos, pedidos e funcionalidades administrativas através de endpoints REST padronizados.

### Características

- ✅ **RESTful**: Endpoints padronizados HTTP
- ✅ **TypeScript**: Tipos completos disponíveis
- ✅ **Autenticação**: JWT + Supabase Auth
- ✅ **Validação**: Schema validation rigoroso
- ✅ **Rate Limiting**: Proteção contra abuso
- ✅ **Webhooks**: Notificações em tempo real
- ✅ **Documentação**: OpenAPI/Swagger

### Base URL

```bash
# Produção
https://vytalle-estetica.vercel.app/api

# Desenvolvimento
http://localhost:3000/api
```

### Status da API

```bash
# Health check
curl https://vytalle-estetica.vercel.app/api/health

# Resposta
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "environment": "production"
}
```

---

## 🔐 Autenticação

### 1. JWT Token

```bash
# Login para obter token
curl -X POST https://vytalle-estetica.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "senha123"
  }'

# Resposta
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
```

### 2. Usando Token

```bash
# Inclua o token no header Authorization
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  https://vytalle-estetica.vercel.app/api/products
```

### 3. Refresh Token

```bash
# Renove o token antes de expirar
curl -X POST https://vytalle-estetica.vercel.app/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### 4. Logout

```bash
# Invalide o token
curl -X POST https://vytalle-estetica.vercel.app/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📡 Endpoints

### Produtos

#### GET /api/products

Lista todos os produtos disponíveis.

```bash
curl https://vytalle-estetica.vercel.app/api/products
```

**Parâmetros de Query:**
- `category` (string): Filtrar por categoria
- `search` (string): Busca por nome
- `limit` (number): Limite de resultados (padrão: 50)
- `offset` (number): Offset para paginação

**Exemplo com filtros:**
```bash
curl "https://vytalle-estetica.vercel.app/api/products?category=Toxina%20Botul%C3%ADnica&limit=10"
```

**Resposta:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Botox 50U",
      "description": "Toxina botulínica tipo A",
      "price_pix": 530.00,
      "price_card": 580.00,
      "price_prazo": 580.00,
      "category": "Toxina Botulínica",
      "images": ["/images/botox-50u.jpg"],
      "active": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

#### GET /api/products/[slug]

Obtém detalhes de um produto específico.

```bash
curl https://vytalle-estetica.vercel.app/api/products/botox-50u
```

**Resposta:**
```json
{
  "id": "1",
  "name": "Botox 50U",
  "description": "Toxina botulínica tipo A para tratamento de rugas",
  "price_pix": 530.00,
  "price_card": 580.00,
  "price_prazo": 580.00,
  "category": "Toxina Botulínica",
  "images": ["/images/botox-50u.jpg"],
  "specifications": {
    "concentration": "50U",
    "volume": "2ml",
    "storage": "Refrigerado"
  },
  "active": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Pedidos

#### POST /api/checkout

Cria um novo pedido e gera PDF.

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Dra. Ana Paula Silva",
      "email": "ana@clinic.com",
      "phone": "+5511999999999",
      "cep": "21361-020"
    },
    "products": [
      {
        "id": "1",
        "quantity": 2,
        "price": 530.00
      },
      {
        "id": "2",
        "quantity": 1,
        "price": 1200.00
      }
    ],
    "notes": "Entrega urgente"
  }'
```

**Resposta:**
```json
{
  "order_id": "ORD-2024-001",
  "status": "created",
  "total": 2260.00,
  "pdf_url": "https://vytalle-estetica.vercel.app/api/orders/ORD-2024-001/pdf",
  "whatsapp_message": "PEDIDO VYTALE ESTÉTICA...",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### GET /api/orders

Lista pedidos (apenas admin).

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/orders
```

**Parâmetros de Query:**
- `status` (string): Filtrar por status
- `date_from` (string): Data inicial (YYYY-MM-DD)
- `date_to` (string): Data final (YYYY-MM-DD)
- `limit` (number): Limite de resultados

#### GET /api/orders/[id]

Obtém detalhes de um pedido específico.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/orders/ORD-2024-001
```

### Admin

#### GET /api/admin/dashboard

Estatísticas do painel admin.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/admin/dashboard
```

**Resposta:**
```json
{
  "total_orders": 150,
  "total_revenue": 45000.00,
  "orders_today": 5,
  "revenue_today": 2500.00,
  "top_products": [
    {
      "name": "Botox 50U",
      "quantity": 45,
      "revenue": 23850.00
    }
  ]
}
```

---

## 📊 Modelos de Dados

### Product

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price_pix: number;
  price_card: number;
  price_prazo: number;
  category: string;
  images: string[];
  specifications?: Record<string, any>;
  active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    cep: string;
  };
  products: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

### Customer

```typescript
interface Customer {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address?: string;
  city?: string;
  state?: string;
}
```

---

## 💻 Exemplos de Uso

### JavaScript/Node.js

```javascript
class VytalleAPI {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getProducts(category = null) {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.request(`/products${params}`);
  }

  async createOrder(orderData) {
    return this.request('/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrders(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/orders?${params}`);
  }
}

// Uso
const api = new VytalleAPI(
  'https://vytalle-estetica.vercel.app/api',
  'YOUR_TOKEN'
);

// Listar produtos
const products = await api.getProducts('Toxina Botulínica');

// Criar pedido
const order = await api.createOrder({
  customer: {
    name: 'Dr. Silva',
    email: 'dr@clinic.com',
    phone: '+5511999999999',
    cep: '21361-020'
  },
  products: [
    { id: '1', quantity: 2, price: 530.00 }
  ]
});
```

### Python

```python
import requests
import json

class VytalleAPI:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.token = token
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

    def get_products(self, category=None):
        params = {'category': category} if category else {}
        response = requests.get(
            f'{self.base_url}/products',
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()

    def create_order(self, order_data):
        response = requests.post(
            f'{self.base_url}/checkout',
            headers=self.headers,
            json=order_data
        )
        response.raise_for_status()
        return response.json()

# Uso
api = VytalleAPI(
    'https://vytalle-estetica.vercel.app/api',
    'YOUR_TOKEN'
)

products = api.get_products('Toxina Botulínica')
```

### PHP

```php
<?php

class VytalleAPI {
    private $baseUrl;
    private $token;

    public function __construct($baseUrl, $token) {
        $this->baseUrl = $baseUrl;
        $this->token = $token;
    }

    private function request($endpoint, $method = 'GET', $data = null) {
        $headers = [
            'Authorization: Bearer ' . $this->token,
            'Content-Type: application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 400) {
            throw new Exception("HTTP $httpCode: $response");
        }

        return json_decode($response, true);
    }

    public function getProducts($category = null) {
        $params = $category ? "?category=" . urlencode($category) : "";
        return $this->request("/products$params");
    }

    public function createOrder($orderData) {
        return $this->request('/checkout', 'POST', $orderData);
    }
}

// Uso
$api = new VytalleAPI(
    'https://vytalle-estetica.vercel.app/api',
    'YOUR_TOKEN'
);

$products = $api->getProducts('Toxina Botulínica');
```

---

## ⚡ Rate Limiting

A API implementa rate limiting para proteger contra abuso:

- **Limite**: 100 requests por minuto por IP
- **Headers de resposta**:
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset

**Exemplo de resposta quando excede o limite:**
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Try again in 60 seconds.",
  "retry_after": 60
}
```

---

## 🔔 Webhooks

Configure webhooks para receber notificações em tempo real:

### Eventos Disponíveis

- `order.created`: Novo pedido criado
- `order.updated`: Status do pedido alterado
- `order.cancelled`: Pedido cancelado
- `product.updated`: Produto atualizado

### Configuração

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/webhooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks",
    "events": ["order.created", "order.updated"],
    "secret": "your-webhook-secret"
  }'
```

### Payload do Webhook

```json
{
  "event": "order.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "order_id": "ORD-2024-001",
    "customer": {
      "name": "Dra. Ana Paula Silva",
      "email": "ana@clinic.com"
    },
    "total": 2260.00
  }
}
```

---

## 📚 SDKs

### TypeScript/JavaScript

```bash
npm install vytalle-api
```

```typescript
import { VytalleAPI } from 'vytalle-api';

const api = new VytalleAPI({
  baseURL: 'https://vytalle-estetica.vercel.app/api',
  token: 'YOUR_TOKEN'
});

const products = await api.products.list({ category: 'Toxina Botulínica' });
const order = await api.orders.create(orderData);
```

### Python

```bash
pip install vytalle-api
```

```python
from vytalle_api import VytalleAPI

api = VytalleAPI(
    base_url='https://vytalle-estetica.vercel.app/api',
    token='YOUR_TOKEN'
)

products = api.products.list(category='Toxina Botulínica')
order = api.orders.create(order_data)
```

---

## 🔧 Troubleshooting

### Problemas Comuns

| Problema | Causa | Solução |
|----------|-------|---------|
| **401 Unauthorized** | Token inválido/expirado | Renovar token via `/auth/refresh` |
| **403 Forbidden** | Sem permissão | Verificar role do usuário |
| **429 Too Many Requests** | Rate limit excedido | Aguardar 60 segundos |
| **500 Internal Server Error** | Erro interno | Verificar logs, contatar suporte |
| **422 Validation Error** | Dados inválidos | Verificar schema da requisição |

### Debug de Requests

```bash
# Verbose curl
curl -v -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/products

# Com headers detalhados
curl -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json" \
  -H "User-Agent: VytalleAPI/1.0" \
  https://vytalle-estetica.vercel.app/api/products
```

### Logs de Erro

```javascript
// Interceptar erros
try {
  const response = await api.getProducts();
} catch (error) {
  console.error('API Error:', {
    status: error.status,
    message: error.message,
    response: error.response
  });
}
```

---

## ❌ Códigos de Erro

### HTTP Status Codes

| Código | Descrição | Ação |
|--------|-----------|------|
| **200** | OK | Sucesso |
| **201** | Created | Recurso criado |
| **400** | Bad Request | Dados inválidos |
| **401** | Unauthorized | Token inválido |
| **403** | Forbidden | Sem permissão |
| **404** | Not Found | Recurso não encontrado |
| **422** | Unprocessable Entity | Validação falhou |
| **429** | Too Many Requests | Rate limit |
| **500** | Internal Server Error | Erro do servidor |

### Erros de Validação

```json
{
  "error": "Validation failed",
  "message": "Invalid input data",
  "details": [
    {
      "field": "customer.email",
      "message": "Invalid email format"
    },
    {
      "field": "products",
      "message": "At least one product is required"
    }
  ]
}
```

### Erros de Autenticação

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token",
  "code": "AUTH_TOKEN_INVALID"
}
```

### Erros de Rate Limiting

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Try again in 60 seconds.",
  "retry_after": 60,
  "limit": 100,
  "remaining": 0
}
```

---

## 📞 Suporte

### Contatos

- **📧 E-mail**: [contato.ferreirag@outlook.com](mailto:contato.ferreirag@outlook.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/FuturoDevJunior/codafofo/issues)
- **📖 Docs**: [Documentação Completa](./docs/)

### Recursos

- **[🔧 Troubleshooting](./docs/TROUBLESHOOTING.md)** - Problemas comuns
- **[🚀 Deploy](./docs/DEPLOYMENT.md)** - Guia de deploy
- **[🌐 Demo](https://vytalle-estetica.vercel.app)** - Aplicação em produção
- **[📊 Status](https://vytalle-estetica.vercel.app/api/health)** - Health check

---

**Vytalle Estética API - Integração profissional para seu negócio! 🚀** 