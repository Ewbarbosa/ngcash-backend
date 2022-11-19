import prismaClient from "../../prisma";

class DetailUserService {

    async execute(user_id: string) {

        const Id = parseInt(user_id);

        const user = await prismaClient.user.findFirst({
            where: {
                id: Id
            },
            select: {
                id: true,
                username: true
            }
        })

        return user;
    }

}

export { DetailUserService }