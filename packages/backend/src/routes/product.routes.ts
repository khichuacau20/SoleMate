import { Router } from 'express';

const router = Router();

// Get all products
router.get('/', (req, res) => {
  res.json({ message: 'Get all products' });
});

// Get single product
router.get('/:id', (req, res) => {
  res.json({ message: `Get product ${req.params.id}` });
});

export const productRoutes = router;
