import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
import { orderRoutes } from './routes/order.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
