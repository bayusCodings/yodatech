import { Router } from 'express';

const welcomeRoute = Router();

welcomeRoute.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to Yodatech api services',
  });
});

export default welcomeRoute;