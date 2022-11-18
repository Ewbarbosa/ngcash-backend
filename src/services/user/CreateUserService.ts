import prismaClient from '../../prisma'

interface UserRequest {
    username: string;
    password: string;
}

class CreateUserService {
    async execute({ username, password }: UserRequest) {

        // se não existir um email
        if (!username) {
            throw new Error('Username incorrect')
        }

        // verificar se username já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        })

        if (userAlreadyExists) {
            throw new Error('Username already exists')
        }

        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: password,
            },
            select: {
                id: true,
            }
        })

        const account = await prismaClient.account.create({
            data: {
                //id: user.id,
                balance: 100,
                userId: user.id
            }
        })

        //const update = await prismaClient.user.update({
        //    where: {
        //        id: user.id,
        //    },
        //    data: {
        //        accountId: user.id
        //    }
        //})

        return user;
    }
}

export { CreateUserService }