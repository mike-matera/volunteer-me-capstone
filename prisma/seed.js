const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'TestAdmin',
    email: 'testadmin@test.test',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  await prisma.comment.deleteMany()
  await prisma.shift.deleteMany()
  await prisma.role.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()
  const user = await prisma.user.create({
      data: {
          email: 'test@test.test',
          name: 'Test Admin',

          events: {
              create:[
                  {
                      title: "Annual Fundraiser",
                      description: "Our big annual fundraiser.",
                      status: 'CONSTRUCTION',

                      roles: {
                          create: [
                              {
                                  title: "Kitchen",
                                  description: "Work the Kitchen",
                                  status: 'CONSTRUCTION',

                                  shifts: {
                                      create: [
                                          {
                                              title: "Cook", 
                                              description: "Cook food",
                                              location: "The kitchen",
                                              start: '2021-05-21T14:48:00.000Z',
                                              duration: 60,
                                          },
                                          {
                                              title: "Serve", 
                                              description: "Serve food",
                                              location: "The kitchen",
                                              start: '2021-05-21T14:48:00.000Z',
                                              duration: 60,
                                          },
                                      ],
                                  },
                              },
                              {
                                  title: "Gate",
                                  description: "Work the Gate",
                                  status: 'CONSTRUCTION',

                                  shifts: {
                                      create: [
                                          {
                                              title: "Ticket Taker", 
                                              description: "Take tickets",
                                              location: "The gate",
                                              start: '2021-05-21T14:48:00.000Z',
                                              duration: 60,
                                          },
                                          {
                                              title: "Greeter", 
                                              description: "Greet guests",
                                              location: "The gate",
                                              start: '2021-05-21T14:48:00.000Z',
                                              duration: 60,
                                          },
                                      ],
                                  },
                              },
                          ]
                      },
                  },
              ],
          },
      },
  })
  console.log(user)
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
