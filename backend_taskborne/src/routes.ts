import { FastifyInstance } from "fastify";
import { deleteUserHandler, loginHandler, profileImageHandler, registerHandler, updateUserHandler } from "./modules/User/userControllers";
import { getProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler, iconeImageHandler } from "./modules/Project/projectController"
import {getCardsHandler, createCardsHandler, updateCardsHandler, deleteCardsHandler} from "./modules/Cards/cardsController"

// Configuração personalizada do multer
import upload from "./middlewares/multer";




export async function Routes(app: FastifyInstance) {
  app.delete('/usuario/:id', deleteUserHandler);
  app.delete('/projeto/:id', deleteProjectHandler)
  app.delete('/cards/:id', deleteCardsHandler)
  app.put('/usuario/:id', updateUserHandler);
  app.put('/projeto/:id', updateProjectHandler);
  app.put('/cards/:id', updateCardsHandler);
  app.put('/usuario/:id/upload', { preHandler: upload.single('file') }, profileImageHandler)
  app.put('/projeto/:id/upload', { preHandler: upload.single('file') }, iconeImageHandler)
  app.post('/registro', registerHandler);
  app.post('/usuario/:id/projetos', createProjectHandler);
  app.post('/login', loginHandler);
  app.post('/projeto/:id/cards', createCardsHandler);
  app.get('/projeto/:id', getProjectByIdHandler);
  app.get('/projeto/:id/cards', getCardsHandler);
  app.get('/usuario/:id/projetos', getProjectsHandler);

}

