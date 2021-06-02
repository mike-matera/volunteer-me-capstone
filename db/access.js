/**
 * DB access functions. 
 * 
 * See the SDD for the definition of these functions.
 * 
 */


export async function list_events() {
    const prisma = require('./prisma')
    return prisma.event.findMany({
        include: {
            admins: true,
        }
    })
}

export async function get_event(eventid) {
    const prisma = require('./prisma')
    const event = await prisma.event.findUnique({
        where: {
            id: eventid,
        },
        include: {
            admins: true,
            roles: {
                include: {
                    coordinators: true,
                    shifts: {
                        include: {
                            volunteers: true,
                            comments: true,
                        }
                    }
                }
            }, 
        }        
    })
    console.log(JSON.stringify(event, null, 2))
    return event
}

export function event_can_view(event, user) {
    if (event.admins.some((admin) => admin.id === user.id)) {
        return true
    }
    return event.status === 'READY'
}
