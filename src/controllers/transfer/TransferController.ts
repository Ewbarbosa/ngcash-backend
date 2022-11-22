import { Request, Response } from 'express'
import { TransfersService } from '../../services/transfer/TransferService'

class TransfersController {
    async handle(req: Request, res: Response) {

        const user = req.user_id;

        const { userCashIn, value } = req.body;

        const showTransfersService = new TransfersService();

        const transfer = await showTransfersService.execute({ user, userCashIn, value });

        return res.json(transfer);
    }
}

export { TransfersController }