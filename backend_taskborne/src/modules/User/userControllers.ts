import {FastifyRequest, FastifyReply } from 'fastify';
import {compare, hash} from 'bcrypt'
import {prisma} from '../../lib/prisma'
import {FindUserByIdSchema, LoginSchema, RegisterSchema} from './userSchema'
import { v4 as uuidv4 } from 'uuid';


 export const deleteUserHandler = async (request: FastifyRequest<{Params: FindUserByIdSchema }>, reply: FastifyReply): Promise<any> => {
    const userId = request.params.id;
  
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          id: userId
        }
      });
  
      if (!userExists) {
        throw new Error("User not found");
      }
  
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId
        }
      });
  
      return {
        message: "User deleted successfully",
        deletedUser
      };
  
    } catch (error: any) {
      return reply.status(422).send(error.message)
    }
  };

  
  export const updateUserHandler = async (request: FastifyRequest<{ Params: FindUserByIdSchema, Body: RegisterSchema, Files: { imagem?: File } }>, reply: FastifyReply): Promise<any> => {
    const user_id = request.params.id;
    const { username, password } = request.body;
    try{
      const userExists = await prisma.user.findFirst({
        where: {
          id: {
            equals: user_id
            }
        }
      });
  
      if (!userExists) {
        throw new Error("User not found");
      }
  
      const updatedUserData: {
        username?: string;
        email?: string;
        password?: string;
      } = {};
  
      // Only update fields if they are provided in the request
      if (username !== undefined) {
        updatedUserData.username = username;
      }
  
  
      if (password !== undefined) {
        // Hash the password only if it is provided
        const hashedPassword: string = await hash(password, 8);
        updatedUserData.password = hashedPassword;
      }
  
      const updatedUser = await prisma.user.update({
        where: {
          id: user_id
        },
        data: updatedUserData
      });
  
      return {
        updatedUser
      }
  
    } catch (error: any) {
      return reply.status(422).send(error.message);
    }
  };
  
  
  export  const registerHandler = async (request: FastifyRequest<{Body:RegisterSchema }>, reply: FastifyReply): Promise<any> => {
    const { username, email, password } = request.body;

    const user = await prisma.user.findFirst({
      where:{
        email
      }
    })
    if(user){
      throw new Error("Email invalido ou ja cadastrado")
    }
  
    try {
      const hashedPassword: string = await hash(password, 8);
      
      const response = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword
        }
      });
  
      return {
        response
      }
  
    } catch (error: any) {
      return reply.status(422).send(error.message)
    }
  };
  
  export const loginHandler = async (request: FastifyRequest<{ Body: LoginSchema }>, reply: FastifyReply): Promise<any> => {
    const { email, password } = request.body;
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
  
      if (!user) {
        throw new Error("Unregistered user or incorrect email");
      }
  
      const passwordMatch = await compare(password, user.password);
  
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }
  
      // Create a new user object without the "password" property
      const userWithoutPassword = { ...user, password: undefined };
  
      return {
        user: userWithoutPassword
      };
  
    } catch (error: any) {
      console.error(error.message);
      return reply.status(422).send(error.message);
    }
  };
  export const profileImageHandler = async (request: FastifyRequest<{ Params: {id: string}  }>, reply: FastifyReply) => {
    const user_id = request.params.id;
    try {
      
      if (!request.file) {
        return reply.code(400).send({ error: 'Nenhuma imagem foi enviada.' });
      }
      const userExists = await prisma.user.findFirst({
        where: {
          id: {
            equals: user_id
            }
        }
      });
  
      if (!userExists) {
        throw new Error("User not found");
      }
  
      // Obtém o nome do arquivo gerado pelo multer
      const imageName = `http://localhost:3333/images/${request.file.filename}`;

      const user = await prisma.user.update({
        where: {
          id: userExists.id
        }, 
        data: {
          profileImageUrl: imageName
        }
      })
  
      // Você pode adicionar o nome do arquivo à resposta
      return reply.send({ message: "Foto adicionada com sucesso" });
    } catch (err) {
      // Captura qualquer erro e retorna uma resposta de erro
      reply.code(500).send({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }
  };