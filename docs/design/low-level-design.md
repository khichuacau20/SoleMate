# Low-Level Design (LLD)
## SoleMate E-Commerce Platform

### 1. Microservices Design

#### 1.1 Product Service
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sizes: Size[];
  colors: Color[];
  images: Image[];
  inventory: InventoryItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface Size {
  id: string;
  value: string;
  measurement: string;
}

interface Color {
  id: string;
  name: string;
  hexCode: string;
}

interface Image {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface InventoryItem {
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  location: string;
}
```

#### 1.2 Order Service
```typescript
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
```

#### 1.3 Payment Service
```typescript
interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: Date;
}

enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE'
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}
```

### 2. Database Schema Design

#### 2.1 Products Database
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  size_id UUID REFERENCES sizes(id),
  color_id UUID REFERENCES colors(id),
  sku VARCHAR(50) UNIQUE,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
  id UUID PRIMARY KEY,
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  location VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2.2 Orders Database
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address_id UUID REFERENCES addresses(id),
  billing_address_id UUID REFERENCES addresses(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. API Endpoints Design

#### 3.1 Product Service API
```typescript
// Product Routes
GET /api/products - List all products
GET /api/products/:id - Get product details
POST /api/products - Create new product
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product

// Inventory Routes
GET /api/inventory/:productId - Get inventory levels
PUT /api/inventory/:productId - Update inventory
```

#### 3.2 Order Service API
```typescript
// Order Routes
POST /api/orders - Create new order
GET /api/orders/:id - Get order details
PUT /api/orders/:id/status - Update order status
GET /api/users/:userId/orders - Get user's orders

// Cart Routes
GET /api/cart - Get cart contents
POST /api/cart - Add item to cart
PUT /api/cart/:itemId - Update cart item
DELETE /api/cart/:itemId - Remove from cart
```

#### 3.3 Payment Service API
```typescript
// Payment Routes
POST /api/payments - Process payment
GET /api/payments/:id - Get payment details
POST /api/payments/:id/refund - Process refund
GET /api/orders/:orderId/payment - Get order payment
```

### 4. Component Interaction Patterns

#### 4.1 Event-Driven Communication
```typescript
interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  timestamp: Date;
}

interface PaymentProcessedEvent {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
  timestamp: Date;
}

interface InventoryUpdatedEvent {
  productId: string;
  quantity: number;
  location: string;
  timestamp: Date;
}
```

#### 4.2 Error Handling
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

enum ErrorCode {
  INVALID_INPUT = 'INVALID_INPUT',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INVENTORY_ERROR = 'INVENTORY_ERROR'
}
```

### 5. Security Implementation

#### 5.1 Authentication
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
  exp: number;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}
```

#### 5.2 Authorization
```typescript
enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT'
}

interface Permission {
  resource: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}
```
