import { Router } from 'express';

const router = Router();

// Create order
router.post('/', (req, res) => {
  res.json({ message: 'Create order' });
});

// Get order
router.get('/:id', (req, res) => {
  res.json({ message: `Get order ${req.params.id}` });
});

export const orderRoutes = router;
