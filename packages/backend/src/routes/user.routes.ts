import { Router } from 'express';

const router = Router();

// Register user
router.post('/register', (req, res) => {
  res.json({ message: 'User registration' });
});

// Login user
router.post('/login', (req, res) => {
  res.json({ message: 'User login' });
});

export const userRoutes = router;
