import prismaClient from "../../prisma";

class ShowUserService {

    async execute(userId: string) {

        const id = parseInt(userId);

        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                username: true
            }
        })

        return user;
    }

}

export { ShowUserService }