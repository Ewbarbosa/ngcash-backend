import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { TransfersController } from './controllers/transfer/TransferController';
import { ShowTransfersController } from './controllers/transfer/ShowTransfersController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { ShowBalanceController } from './controllers/balance/ShowBalanceController';
import { ShowUserController } from './controllers/user/ShowUserController';

const router = Router();

// rotas
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/user', isAuthenticated, new ShowUserController().handle)

// rotas transfer
router.post('/transfer', isAuthenticated, new TransfersController().handle)
router.get('/transfers', isAuthenticated, new ShowTransfersController().handle)

// rota balance
router.get('/balance', isAuthenticated, new ShowBalanceController().handle);

export { router };