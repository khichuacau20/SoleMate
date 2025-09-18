# API Documentation
## SoleMate E-Commerce Platform

### Base URL
```
Production: https://api.solemate.com/v1
Staging: https://api-staging.solemate.com/v1
```

### Authentication
All API requests require authentication using JWT tokens.

```http
Authorization: Bearer <token>
```

### 1. Product API

#### 1.1 List Products
```http
GET /products

Query Parameters:
- page (integer): Page number for pagination
- limit (integer): Number of items per page
- category (string): Filter by category
- brand (string): Filter by brand
- color (string): Filter by color
- size (string): Filter by size
- price_min (number): Minimum price
- price_max (number): Maximum price
- sort (string): Sort by field (price, name, created_at)
- order (string): Sort order (asc, desc)

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "brand": "string",
      "sizes": ["string"],
      "colors": ["string"],
      "images": ["string"],
      "inventory": {
        "available": "boolean",
        "quantity": "number"
      }
    }
  ],
  "pagination": {
    "current_page": "number",
    "total_pages": "number",
    "total_items": "number"
  }
}
```

#### 1.2 Get Product Details
```http
GET /products/:id

Response 200:
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": {
    "id": "uuid",
    "name": "string"
  },
  "brand": {
    "id": "uuid",
    "name": "string"
  },
  "variants": [
    {
      "id": "uuid",
      "size": "string",
      "color": "string",
      "price": "number",
      "inventory": "number"
    }
  ],
  "images": [
    {
      "url": "string",
      "alt": "string",
      "is_primary": "boolean"
    }
  ],
  "reviews": {
    "average_rating": "number",
    "total_reviews": "number"
  }
}
```

### 2. Order API

#### 2.1 Create Order
```http
POST /orders

Request Body:
{
  "items": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": "number"
    }
  ],
  "shipping_address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zip_code": "string"
  },
  "billing_address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zip_code": "string"
  },
  "payment_method": "string"
}

Response 201:
{
  "order_id": "uuid",
  "status": "string",
  "total_amount": "number",
  "payment_intent": "string"
}
```

#### 2.2 Get Order Details
```http
GET /orders/:id

Response 200:
{
  "id": "uuid",
  "status": "string",
  "items": [
    {
      "product": {
        "id": "uuid",
        "name": "string",
        "image": "string"
      },
      "variant": {
        "size": "string",
        "color": "string"
      },
      "quantity": "number",
      "price": "number"
    }
  ],
  "shipping_address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zip_code": "string"
  },
  "tracking": {
    "number": "string",
    "carrier": "string",
    "status": "string"
  },
  "payment": {
    "method": "string",
    "status": "string",
    "total": "number"
  }
}
```

### 3. User API

#### 3.1 User Registration
```http
POST /auth/register

Request Body:
{
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string"
}

Response 201:
{
  "user_id": "uuid",
  "token": "string",
  "refresh_token": "string"
}
```

#### 3.2 User Login
```http
POST /auth/login

Request Body:
{
  "email": "string",
  "password": "string"
}

Response 200:
{
  "token": "string",
  "refresh_token": "string",
  "expires_in": "number"
}
```

### 4. Cart API

#### 4.1 Add to Cart
```http
POST /cart/items

Request Body:
{
  "product_id": "uuid",
  "variant_id": "uuid",
  "quantity": "number"
}

Response 200:
{
  "cart_id": "uuid",
  "items": [
    {
      "id": "uuid",
      "product": {
        "id": "uuid",
        "name": "string",
        "image": "string"
      },
      "variant": {
        "size": "string",
        "color": "string"
      },
      "quantity": "number",
      "price": "number"
    }
  ],
  "total_items": "number",
  "total_amount": "number"
}
```

### 5. Payment API

#### 5.1 Process Payment
```http
POST /payments

Request Body:
{
  "order_id": "uuid",
  "payment_method": "string",
  "payment_token": "string"
}

Response 200:
{
  "payment_id": "uuid",
  "status": "string",
  "transaction_id": "string"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "string",
    "details": {}
  }
}
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```
