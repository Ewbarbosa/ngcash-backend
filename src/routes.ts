import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';

const router = Router();

// rotas
router.post('/user', new CreateUserController().handle);


export { router };