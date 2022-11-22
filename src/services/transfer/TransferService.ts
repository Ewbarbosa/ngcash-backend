import prismaClient from "../../prisma";

interface TransferRequest {
  user: string;
  userCashIn: string;
  value: number;
}

class TransfersService {
  async execute({ user, userCashIn, value }: TransferRequest) {

    //console.log(userCashIn) username
    //console.log(user) id

    // carrega usuario que receberá cashIn
    const userIn = await prismaClient.user.findFirst({
      where: {
        username: userCashIn
      },
      select: {
        id: true,
        username: true
      }
    });

    const userId = parseInt(user)
    const userOut = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        account: true,
      }
    })

    if ((!userIn) || (userOut.username === userCashIn)) {
      throw new Error('Impossible to perform the transfer');
    }

    const balance = userOut.account.balance;

    // verifica saldo
    if (value > balance) {
      throw new Error('Insufficient funds');
    }

    const newBalance = balance - value;

    const updateUserOut = await prismaClient.account.update({
      where: {
        userId: userOut.id
      },
      data: {
        balance: newBalance
      }
    })

    const updateUserIn = await prismaClient.account.update({
      where: {
        userId: userIn.id
      },
      data: {
        balance: balance + value
      }
    })

    const transaction = await prismaClient.transaction.create({
      data: {
        value: value,
        debitedAccountId: userOut.id,
        creditedAccountId: userIn.id,
      }
    })

    return transaction;
  }
}

export { TransfersService }