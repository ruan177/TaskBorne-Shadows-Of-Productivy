import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma'
import { CardsSchema, CreateCardsSchema, FindByIdSchema } from './cardsSchema';
import { File } from 'fastify-multer';

export const getCardsHandler = async (request: FastifyRequest<{Params:FindByIdSchema}>, reply: FastifyReply) => {
    const {id} = request.params
    console.log(id)
    try {
        const cards = await prisma.card.findMany({
          where: {
            projectId:{
                equals: id
            }
          }
        }          
        );
        
        reply.send({cards});
    }
    catch (error: any) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const createCardsHandler = async (request: FastifyRequest<{Body: CreateCardsSchema,Params:FindByIdSchema  }>, reply: FastifyReply) => {
    const {id} = request.params
    const { title, status } = request.body;
    try {
        const newCard = await prisma.card.create({
            data: { 
                title, 
                status,
                projectId: id
             }
        });
        console.log(request.body)
        reply.send(newCard);
    }
    catch (error: any) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const updateCardsHandler = async (request: FastifyRequest<{ Params: FindByIdSchema, Body: CardsSchema }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { title, status } = request.body;
    try {
        
        
        if(title === undefined && status === undefined){
            throw new Error("Dados Invalidos")
        }

        const updatedCard = await prisma.card.update({
            where: { id },
            data: {
                title: title ?? undefined,
                status: status ?? undefined,
            },
        });

        reply.send(updatedCard);
    } catch (error: any) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

 export const deleteCardsHandler = async (request: FastifyRequest<{Params:FindByIdSchema}>, reply: FastifyReply) => {
    const { id } = request.params;
    try {
    const deletedCard = await prisma.card.delete({
        where: { id  },
    });
    reply.send(deletedCard);
    }catch (error: any) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};
