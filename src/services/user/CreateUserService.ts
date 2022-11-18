import prismaClient from '../../prisma'

import { hash } from 'bcryptjs'

interface UserRequest {
  username: string;
  password: string;
}

class CreateUserService {
  async execute({ username, password }: UserRequest) {

    // (?=(?:.*?[A-Z]){1}) - Mínimo 1 letras maiúsculas
    // (?=(?:.*?[A-Z]){1}) - mínimo 1 letra minúscula
    // (?=(?:.*?[0-9]){1}) - Mínimo 1 números
    // (?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#;$%*(){}_+^&] - Mínimo 1 caractere especial

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})/;

    // se não existir um email ou se for menor que 3 caracteres
    if ((!username) || (username.length < 3)) {
      throw new Error('Username incorrect')
    }

    // verificar a forca da senha
    if (password.length < 8) {
      throw new Error('Password incorrect')
    }
    else if (!regex.exec(password)) {
      throw new Error('Password incorrect')
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

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        username: username,
        password: passwordHash,
      },
      select: {
        id: true,
      }
    })

    if (user.id > 0) {
      const account = await prismaClient.account.create({
        data: {
          //id: user.id,
          balance: 100,
          userId: user.id
        }
      })
    }



    return user;
  }
}

export { CreateUserService }