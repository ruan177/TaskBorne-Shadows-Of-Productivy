import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.deleteMany()
  await prisma.project.deleteMany()
  await Promise.all([
    await prisma.user.create({
      data: {
        id: "c13a1794-7db2-4df1-8d42-ec5dd1c0976c",
        username: "ruan177",
        email: "ruanpatrick177@gmail.com",
        password: await hash('12345', 8),
      }
    }),
    // prism
  ]),
  await prisma.project.create({
    data: {
      id: "6c04871f-d58b-4580-a5a7-401a39f30463",
      name: "Orientação a objeto",
      description: "Desenovolver os conceitos de classes, herança, polimorfismo, escopo",
      author: {
        connect: {
          id: "c13a1794-7db2-4df1-8d42-ec5dd1c0976c" // replace with the id of the user you want to connect this project to
        }
      }
    },
  })
  await prisma.card.create({
    data: { 
      title: "Card1", 
      status: "TODO",  
      projectId: "6c04871f-d58b-4580-a5a7-401a39f30463" },
  }),
  await prisma.card.create({
    data: { 
      title: "Card2", 
      status: "IN_PROGRESS",  
      projectId: "6c04871f-d58b-4580-a5a7-401a39f30463" },
  });
  await prisma.card.create({
    data: { 
      title: "Card3", 
      status: "DONE",  
      projectId: "6c04871f-d58b-4580-a5a7-401a39f30463" },
  });

  

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })