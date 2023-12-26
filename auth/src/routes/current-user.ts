import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  console.log('Querying current user..');
  res.send('Hi there');
});

export { router as currentUserRouter };
