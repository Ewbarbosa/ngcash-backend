import { Request, Response } from "express";
import { ShowBalanceService } from "../../services/balance/ShowBalanceService";

class ShowBalanceController {

    async handle(req: Request, res: Response) {

        const userId = req.user_id;

        const showBalanceService = new ShowBalanceService();

        const balance = await showBalanceService.execute(userId);

        return res.json(balance);
    }

}

export { ShowBalanceController }