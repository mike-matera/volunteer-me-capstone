
import withSession from '../../../lib/session'
import { v4 as uuidv4 } from 'uuid';
import { 
} from '../../../db/access'

/**
 *  
 * A request to: /api/role/<roleid> will call this handler.
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

    const id = req.query.roleid 
    console.log("role request:", id, req.method)
    const prisma = require('../../../db/prisma')

    if (req.method === 'GET') {
        // TODO: SELECT 
        res.status(200).json({ error: 'TODO'})
    } 
    else if (req.method === 'POST') {
        // TODO: CREATE
        const data = JSON.parse(req.body) 
        const newrole = await prisma.role.create({
            data: {
                id: uuidv4(),
                title: "New Role", 
                description: "", 
                status: 'CONSTRUCTION',
                event_: {
                    connect: { id: data.event },
                },
            },
        })
        res.status(200).json({ role: newrole })
    }    
    else if (req.method === 'PUT') {
        // TODO: VALIDATE PERMISSIONS
        const data = JSON.parse(req.body) 
        const update = await prisma.role.update({
            where: {
              id: id,
            },
            data: data
        })
        res.status(200).json({ user: update })
    }    
    else if (req.method === 'DELETE') {
        // TODO: VALIDATE PERMISSIONS
        const result = await prisma.role.delete({
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
