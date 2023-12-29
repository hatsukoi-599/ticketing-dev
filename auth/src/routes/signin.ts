import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/users';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validate-request';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password.'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Invalid Crendentials');
    }
    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Crendentials');
    }
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    return res.status(200).send(user);
  }
);

export { router as signinRouter };
