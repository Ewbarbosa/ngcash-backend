import { CreateUserService } from '../../services/user/CreateUserService';
import { Request, Response } from 'express'

class CreateUserController {
    async handle(req: Request, res: Response) {

        const { username, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ username, password });

        return res.json(user);
    }
}

export { CreateUserController }