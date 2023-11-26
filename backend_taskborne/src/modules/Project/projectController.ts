// projectRoutes.js

import {FastifyRequest, FastifyReply } from 'fastify';
import {prisma} from '../../lib/prisma'
import { CreateProjectSchema, FindByIdSchema, UpdateProjectSchema } from './projectSchema';


export const getProjectsHandler = async (request: FastifyRequest<{Params:FindByIdSchema }>, reply: FastifyReply) => {
  const user_id = request.params.id;
  try {
    const formattedProjects = await prisma.project.findMany({
      where:{
        authorId: {
          equals: user_id
        }
      },
      include: {
        author: true
    }
    });

    const projects = formattedProjects.map((project) => {
      return {
        id: project.id,
        name: project.name,
        description: project.description,
        iconUrl: project.iconUrl
        
     };
    });
    reply.send({projects});
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const getProjectByIdHandler = async (request: FastifyRequest<{Params:FindByIdSchema }>, reply: FastifyReply) => {
  const projectId = request.params.id;

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    reply.send(project);
  } catch (error: any) {
    reply.status(422).send(error.message);
  }
};

export const createProjectHandler = async (request: FastifyRequest<{Body:CreateProjectSchema, Params: FindByIdSchema }>, reply: FastifyReply) => {
  const { name } = request.body;
  const user_id = request.params.id;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        authorId: user_id
      },
    });

    reply.send(newProject);
  } catch (error: any) {
    reply.status(422).send(error.message);
  }
};

export const updateProjectHandler = async (request: FastifyRequest<{Body:UpdateProjectSchema, Params: FindByIdSchema }>, reply: FastifyReply) => {
  const projectId = request.params.id;
  const { name, description } = request.body;
 
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description
      },
    });

    reply.send(updatedProject);
  } catch (error: any) {
    reply.status(422).send(error.message);
  }
};

export const deleteProjectHandler = async (request: FastifyRequest<{Params:FindByIdSchema }>, reply: FastifyReply) => {
  const projectId = request.params.id;

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    reply.send({
      message: 'Project deleted successfully',
      deletedProject,
    });
  } catch (error: any) {
    reply.status(422).send(error.message);
  }
};
export const iconeImageHandler = async (request: FastifyRequest<{Params:FindByIdSchema }>, reply: FastifyReply) => {
  const projectId = request.params.id;


    try {
      
      if (!request.file) {
        return reply.code(400).send({ error: 'Nenhuma imagem foi enviada.' });
      }
      const projectExists = await prisma.project.findFirst({
        where: {
          id: projectId,
        },
      });
  
      if (!projectExists) {
        throw new Error('Project not found');
      }
  
      // Obtém o nome do arquivo gerado pelo multer
      const imageName = `http://localhost:3333/images/${request.file.filename}`;

      const project = await prisma.project.update({
        where: {
          id: projectExists.id
        }, 
        data: {
          iconUrl: imageName
        }
      })
  
      // Você pode adicionar o nome do arquivo à resposta
      return reply.send({ message: "Foto adicionada com sucesso" });
    } catch (err) {
      // Captura qualquer erro e retorna uma resposta de erro
      reply.code(500).send({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }

};



