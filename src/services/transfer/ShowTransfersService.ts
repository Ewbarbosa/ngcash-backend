import prismaClient from "../../prisma";

class ShowTransfersService {
  async execute(user: string) {

    const userId = parseInt(user);

    const transfers = await prismaClient.transaction.findMany({
      where: {
        OR: [
          {
            debitedAccountId: userId,
          },
          {
            creditedAccountId: userId
          }
        ]
      }
    })

    return transfers;
  }
}

export { ShowTransfersService }