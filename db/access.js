/**
 * DB access functions. 
 * 
 * See the SDD for the definition of these functions.
 */

/** 
 * Get all events that are visible to a user. 
 * 
 * SERVER ONLY
 * 
 * @param {*} user 
 * @returns event with joined admins
 */
export async function list_events(user) {
    const prisma = require('./prisma')
    return prisma.event.findMany({
        where: {
            OR: [
                {
                    admins: {
                        some: {
                        id: user.id
                        },
                    },
                },
                {
                    status: 'READY',
                }
            ],
        },
        include: {
            admins: true,
        }
    })
}

/**
 * Get all of the data necesary to display an event 
 * 
 * SERVER ONLY
 * 
 * @param {*} id
 * @returns Complete event structure
 */
export async function get_event(eventid) {
    const prisma = require('./prisma')
    return prisma.event.findUnique({
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
}

/**
 * Check if the user can view the event. 
 * 
 * MIXED
 * 
 * @param {*} event 
 * @param {*} user 
 * @returns bool
 */
export function event_can_view(event, user) {
    if (event.status == 'READY') {
        return true
    }
    else {
        for (var admin of event.admins) {
            if (admin.id == user.id) {
                return true;
            }
        }
        return false
    }
}