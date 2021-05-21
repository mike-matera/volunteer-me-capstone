
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
                                },
                                {
                                    title: "Gate",
                                    description: "Work the Gate",
                                },
                            ]
                        }
                    }
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
    const users = await prisma.user.findMany()
    console.log(users)

    var dbdata = {}
    var pagedata = []
    var status = "ok"
    return {
        page: pagedata,
        db: dbdata,
        status: status,
    }

}
