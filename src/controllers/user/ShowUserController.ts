import { Request, Response } from 'express'
import { ShowUserService } from '../../services/user/ShowUserService';

class ShowUserController {

    async handle(req: Request, res: Response) {

        const { userId } = req.body;

        const showUserService = new ShowUserService();

        const user = await showUserService.execute(userId);

        return res.json(user);
    }

}

export { ShowUserController }