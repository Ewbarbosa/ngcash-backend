import prismaClient from "../../prisma";

class ShowBalanceService {

  async execute(id: string) {

    const userId = parseInt(id);

    const balance = await prismaClient.account.findFirst({
      where: {
        userId: userId
      }
    })

    return balance;
  }
}

export { ShowBalanceService }