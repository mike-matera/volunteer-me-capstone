
import withSession from '../../../lib/session'
import { v4 as uuidv4 } from 'uuid';
import { 
    get_event,
    event_can_view,
} from '../../../db/access'

/**
 *  
 * A request to: /api/event/<eventid> will call this handler.
 * 
 * @param {*} req - The HTTP request
 * @param {*} res - The response to send to the client.
 * 
 */
 export default withSession(async (req, res) => {

    // Only allow authenticated access to the API.
    const user = req.session.get('user')
    if (user == null) {
        res.status(400).json({error: 'Not logged in'})
        return
    }

    const id = req.query.eventid 
    console.log("event request:", id, req.method)
    const prisma = require('../../../db/prisma')

    if (req.method === 'GET') {
        const event = await get_event(id)
        if (event == null || !event_can_view(event, user) ) {
            res.status(404).json({error: 'No such event'})
        }
        else {
            res.status(200).json(event)
        }
    } 
    else if (req.method === 'POST') {
        // TODO: CREATE
        const newevent = {
            id: uuidv4(),
            title: "New event",
            status: 'CONSTRUCTION',
            admins: {
                connect: [
                    {id: user.id},
                ]
            }
        }
        res.status(200).json({ ok: await prisma.event.create({ data: newevent }) })
    }    
    else if (req.method === 'PUT') {
        // TODO: VALIDATE PERMISSIONS
        const data = JSON.parse(req.body) 
        const update = await prisma.event.update({
            where: {
              id: id,
            },
            data: data
        })
        res.status(200).json({ ok: update })
    }    
    else if (req.method === 'DELETE') {
        // TODO: VALIDATE PERMISSIONS
        const result = await prisma.event.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json({ ok: result })
    }    
    else {
        res.status(404).json({ error: 'Not Implemented'})
    }
})