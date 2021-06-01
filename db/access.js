/**
 * DB access functions. 
 * 
 * See the SDD for the definition of these functions.
 * 
 */

import prisma from './prisma'

export async function list_events() {
    return prisma.event.findMany()
}

export async function get_event(eventid) {
    const event = await prisma.event.findUnique({
        where: {
            id: eventid,
        },
        include: {
            admins: true,
            roles: {
                include: {
                    shifts: {
                        include: {
                            comments: true,
                        }
                    }
                }
            }, 
        }        
    })
    console.log(event)
    return event
}
