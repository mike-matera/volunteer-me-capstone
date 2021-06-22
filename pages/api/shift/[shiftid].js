
import withSession from '../../../lib/session'
import { v4 as uuidv4 } from 'uuid';
import { 
} from '../../../db/access'

/**
 *  
 * A request to: /api/shift/<shiftid> will call this handler.
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

    const id = req.query.shiftid 
    console.log("shift request:", id, req.method)
    const prisma = require('../../../db/prisma')

    if (req.method === 'GET') {
        // TODO: SELECT         
        res.status(200).json({ error: 'TODO'})
    } 
    else if (req.method === 'POST') {
        // TODO: CREATE
        const data = JSON.parse(req.body) 
        const newshift = await prisma.shift.create({
            data: {
                id: uuidv4(),
                title: "New Shift", 
                description: "", 
                location: "",
                start: "",
                duration: 60, 
                role_: {
                    connect: { id: data.role },
                },
            },
        })
        res.status(200).json({ role: newshift })
    }    
    else if (req.method === 'PUT') {
        // TODO: VALIDATE PERMISSIONS
        const data = JSON.parse(req.body) 
        const update = await prisma.shift.update({
            where: {
              id: id,
            },
            data: data
        })
        res.status(200).json({ user: update })
    }    
    else if (req.method === 'DELETE') {
        // TODO: VALIDATE PERMISSIONS
        const result = await prisma.shift.delete({
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
