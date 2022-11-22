import { Request, Response } from 'express'
import { ShowTransfersService } from '../../services/transfer/ShowTransfersService'

class ShowTransfersController {
    async handle(req: Request, res: Response) {

        const user = req.user_id;

        const showTransfersService = new ShowTransfersService();

        const transfers = await showTransfersService.execute(user);

        console.log(transfers);

        return res.json(transfers);
    }
}

export { ShowTransfersController }