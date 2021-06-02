
import withSession from '../../../lib/session'
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
    console.log("EVENT request:", id, req.method)

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
        res.status(200).json({ error: 'TODO'})
    }    
    else if (req.method === 'PUT') {
        // TODO: UPDATE
        res.status(200).json({ error: 'TODO'})
    }    
    else if (req.method === 'DELETE') {
        // TODO: DELETE
        res.status(200).json({ error: 'TODO'})
    }    
    else {
        res.status(404).json({ error: 'Not Implemented'})
    }
})