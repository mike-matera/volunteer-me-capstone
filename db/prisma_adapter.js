
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function create_db() {
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
}

export async function insert(item) {

}

export async function update(item) {

}

export async function del(item) {

}

export async function query() {
    const events = await prisma.event.findMany({
        include: {
            admins: true,
            roles: {
                include: {
                    coordinators: true,
                    shifts: {
                        include: {
                            comments: true,
                        }
                    }
                }
            }, 
        }        
    })
    console.log(events)

    var status = "ok"
    return {
        db: events,
        status: status,
    }
}
