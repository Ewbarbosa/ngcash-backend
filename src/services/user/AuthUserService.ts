import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    username: string;
    password: string;
}

class AuthUserService {
    async execute({ username, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        })

        if (!user) {
            throw new Error('Username/Password incorrect')
        }

        // verifica a senha
        const passwordDecrypt = await compare(password, user.password);

        if (!passwordDecrypt) {
            throw new Error('Username / Password incorrect')
        }

        // gerar token
        const token = sign({
            id: user.id,
            username: user.username
        },
            process.env.JWT_SECRET,
            {
                subject: user.id.toString(),
                expiresIn: '1d'
            })


        return {
            id: user.id,
            username: user.username,
            token: token
        }
    }
}

export { AuthUserService }