import { Router } from 'express';

const router = Router();

router.post('/upload', (req, res) => {
  res.send('rota do upload');
});

router.patch('/confirm', (req, res) => {
  res.send('rota do confirm');
});

router.get('/:customer_code/list', (req, res) => {
  res.send('rota do list');
});

export default router;
