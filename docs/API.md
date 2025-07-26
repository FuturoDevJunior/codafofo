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
- `active` (boolean): Apenas produtos ativos
- `limit` (number): Limite de resultados (padrão: 50)
- `offset` (number): Offset para paginação

**Resposta:**
```json
{
  "products": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Botox 50U",
      "slug": "botox-50u",
      "price_pix": 530.00,
      "price_card": 580.00,
      "price_prazo": 580.00,
      "description": "Toxina botulínica premium",
      "images": ["/images/botox-50u.jpg"],
      "category": "Toxina Botulínica",
      "active": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/products/{slug}

Obtém detalhes de um produto específico.

```bash
curl https://vytalle-estetica.vercel.app/api/products/botox-50u
```

**Resposta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Botox 50U",
  "slug": "botox-50u",
  "price_pix": 530.00,
  "price_card": 580.00,
  "price_prazo": 580.00,
  "description": "Toxina botulínica premium da Allergan, indicada para tratamento de rugas dinâmicas...",
  "images": [
    "/images/botox-50u.jpg",
    "/images/botox-50u-2.jpg"
  ],
  "category": "Toxina Botulínica",
  "active": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### POST /api/products (Admin)

Cria um novo produto (requer autenticação admin).

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Produto",
    "slug": "novo-produto",
    "price_pix": 100.00,
    "price_card": 110.00,
    "price_prazo": 110.00,
    "description": "Descrição do produto",
    "images": ["/images/novo-produto.jpg"],
    "category": "Categoria",
    "active": true
  }'
```

### Pedidos

#### POST /api/checkout

Cria um novo pedido e gera PDF.

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Dra. Ana Paula",
      
      "email": "ana@clinica.com",
      "cep": "21361-020"
    },
    "items": [
      {
        "product_id": "550e8400-e29b-41d4-a716-446655440000",
        "quantity": 2,
        "unit_price": 530.00
      }
    ],
    "notes": "Entrega urgente"
  }'
```

**Resposta:**
```json
{
  "order_id": "b1c2d3e4-f5a6-7890-1234-56789abcdef0",
  "status": "created",
  "pdf_url": "https://supabase.co/storage/v1/object/public/orders/b1c2d3e4.pdf",
  "whatsapp_message": "PEDIDO VYTALE ESTÉTICA...",
  "total": 1060.00,
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### GET /api/orders (Admin)

Lista todos os pedidos (requer autenticação admin).

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/orders
```

**Parâmetros de Query:**
- `status` (string): Filtrar por status
- `date_from` (string): Data inicial (ISO)
- `date_to` (string): Data final (ISO)
- `limit` (number): Limite de resultados

#### GET /api/orders/{id} (Admin)

Obtém detalhes de um pedido específico.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vytalle-estetica.vercel.app/api/orders/b1c2d3e4-f5a6-7890-1234-56789abcdef0
```

### Relatórios

#### GET /api/reports/sales (Admin)

Relatório de vendas.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://vytalle-estetica.vercel.app/api/reports/sales?period=month"
```

**Parâmetros:**
- `period`: day, week, month, year

**Resposta:**
```json
{
  "period": "month",
  "total_sales": 15000.00,
  "total_orders": 25,
  "average_order": 600.00,
  "top_products": [
    {
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Botox 50U",
      "quantity_sold": 15,
      "total_revenue": 7950.00
    }
  ],
  "sales_by_day": [
    {
      "date": "2024-01-15",
      "sales": 1200.00,
      "orders": 2
    }
  ]
}
```

### Autenticação

#### POST /api/auth/login

Login de administrador.

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "senha123"
  }'
```

#### POST /api/auth/logout

Logout (invalida token).

```bash
curl -X POST https://vytalle-estetica.vercel.app/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Health Check

#### GET /api/health

Verifica status da API.

```bash
curl https://vytalle-estetica.vercel.app/api/health
```

**Resposta:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "database": "connected",
  "uptime": 3600
}
```

---

## 📊 Modelos de Dados

### Product

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  price_pix: number;
  price_card: number;
  price_prazo: number;
  description?: string;
  images: string[];
  category: string;
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
    phone: string;
    email?: string;
    cep?: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  pdf_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}
```

### Customer

```typescript
interface Customer {
  name: string;
  phone: string;
  email?: string;
  cep?: string;
  address?: string;
  city?: string;
  state?: string;
}
```

---

## 💡 Exemplos de Uso

### 1. Integração com ERP

```javascript
// Exemplo: Node.js
const axios = require('axios');

class VytalleAPI {
  constructor(baseURL, token) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getProducts(category = null) {
    const params = category ? { category } : {};
    const response = await this.api.get('/products', { params });
    return response.data.products;
  }

  async createOrder(orderData) {
    const response = await this.api.post('/checkout', orderData);
    return response.data;
  }

  async getSalesReport(period = 'month') {
    const response = await this.api.get(`/reports/sales?period=${period}`);
    return response.data;
  }
}

// Uso
const vytalle = new VytalleAPI(
  'https://vytalle-estetica.vercel.app/api',
  'YOUR_TOKEN'
);

// Buscar produtos
const products = await vytalle.getProducts('Toxina Botulínica');

// Criar pedido
const order = await vytalle.createOrder({
  customer: {
    name: 'Dra. Ana Paula',
    
  },
  items: [
    {
      product_id: '550e8400-e29b-41d4-a716-446655440000',
      quantity: 2,
      unit_price: 530.00
    }
  ]
});
```

### 2. Integração com WhatsApp Business

```javascript
// Exemplo: Envio automático para WhatsApp
async function sendOrderToWhatsApp(order) {
  const message = `*PEDIDO VYTALE ESTÉTICA*

*Cliente:* ${order.customer.name}
*Telefone:* ${order.customer.phone}
*Total:* R$ ${order.total.toFixed(2)}

*Itens:*
${order.items.map(item => 
  `• ${item.product_name} - ${item.quantity}x R$ ${item.unit_price.toFixed(2)}`
).join('\n')}

*PDF:* ${order.pdf_url}

_Vytalle Estética - Produtos Premium_`;

  // Integração com WhatsApp Business API
  await whatsappAPI.sendMessage(order.customer.phone, message);
}
```

### 3. Dashboard de Vendas

```javascript
// Exemplo: Dashboard React
import { useState, useEffect } from 'react';

function SalesDashboard() {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    async function fetchSalesData() {
      const response = await fetch('/api/reports/sales?period=month', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSalesData(data);
    }

    fetchSalesData();
  }, []);

  return (
    <div>
      <h2>Relatório de Vendas</h2>
      <p>Total: R$ {salesData?.total_sales.toFixed(2)}</p>
      <p>Pedidos: {salesData?.total_orders}</p>
      {/* Mais componentes... */}
    </div>
  );
}
```

---

## ⚡ Rate Limiting

A API implementa rate limiting para proteger contra abuso:

- **Limite**: 100 requests por minuto por IP
- **Headers de resposta:**
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset

```bash
# Exemplo de resposta com rate limiting
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1642248600
Retry-After: 60

{
  "error": "Rate limit exceeded",
  "message": "Too many requests, please try again later"
}
```

---

## 🔔 Webhooks

A API suporta webhooks para notificações em tempo real:

### Configuração

```bash
# Configure webhook URL
curl -X POST https://vytalle-estetica.vercel.app/api/webhooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/vytalle",
    "events": ["order.created", "order.updated"]
  }'
```

### Eventos Disponíveis

- `order.created`: Novo pedido criado
- `order.updated`: Pedido atualizado
- `order.cancelled`: Pedido cancelado
- `product.updated`: Produto atualizado

### Payload do Webhook

```json
{
  "event": "order.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "order_id": "b1c2d3e4-f5a6-7890-1234-56789abcdef0",
    "customer": {
      "name": "Dra. Ana Paula",
      
    },
    "total": 1060.00
  }
}
```

---

## 📚 SDKs

### JavaScript/TypeScript

```bash
npm install vytalle-api
```

```typescript
import { VytalleAPI } from 'vytalle-api';

const api = new VytalleAPI({
  baseURL: 'https://vytalle-estetica.vercel.app/api',
  token: 'YOUR_TOKEN'
});

// Usar métodos tipados
const products = await api.products.list();
const order = await api.orders.create(orderData);
```

### Python

```bash
pip install vytalle-api
```

```python
from vytalle_api import VytalleAPI

api = VytalleAPI(
    base_url="https://vytalle-estetica.vercel.app/api",
    token="YOUR_TOKEN"
)

products = api.products.list()
order = api.orders.create(order_data)
```

---

## 🔧 Troubleshooting

### Códigos de Erro Comuns

| Código | Descrição | Solução |
|--------|-----------|---------|
| `400` | Bad Request | Verifique formato dos dados |
| `401` | Unauthorized | Token inválido ou expirado |
| `403` | Forbidden | Sem permissão para recurso |
| `404` | Not Found | Endpoint ou recurso não existe |
| `429` | Too Many Requests | Rate limit excedido |
| `500` | Internal Server Error | Erro interno do servidor |

### Logs de Debug

```bash
# Ative logs detalhados
curl -H "X-Debug: true" \
  https://vytalle-estetica.vercel.app/api/products
```

### Validação de Dados

```typescript
// Exemplo de validação
interface CreateOrderRequest {
  customer: {
    name: string; // obrigatório, 2-100 chars
    phone: string; // obrigatório, formato brasileiro
    email?: string; // opcional, formato email
    cep?: string; // opcional, formato CEP
  };
  items: {
    product_id: string; // obrigatório, UUID válido
    quantity: number; // obrigatório, > 0
    unit_price: number; // obrigatório, > 0
  }[];
  notes?: string; // opcional, max 500 chars
}
```

---

## 📞 Suporte

### Contatos

- **E-mail**: contato.ferreirag@outlook.com

- **Documentação**: https://vytalle-estetica.vercel.app/docs/api

### Recursos

- [Postman Collection](./postman/Vytalle_API.postman_collection.json)
- [OpenAPI Spec](./openapi.yaml)
- [SDK Examples](./examples/)

---

**API profissional para integrações robustas! 🚀** 