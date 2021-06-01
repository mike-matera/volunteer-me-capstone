import {
    create_db,
    del,
    insert,
    query,
    update
} from 'db/prisma_adapter'

/**
 * Top Level API handler. This function receives all calls made 
 * to the /api URL. Requests will contain a variable called "slug"
 * that contains the rest of the path. For example: 
 * 
 * A request to: /api/event/<eventid>
 * Will have slug equal to: ['event', <eventid>] 
 * 
 * The slug is optional. So:
 * 
 * A request to: /api
 * Will have slug equal to: [] 
 * 
 * @param {*} req - The HTTP request
 * @param {*} res - The response to send to the client.
 */
export default async function handler(req, res) {
    const {
        slug
    } = req.query
    let entity = null 
    let id = null 

    console.log("API request:", slug, req.method)

    if (slug.length == 1) {
        entity = slug[0]
    }
    else {
        entity = slug[0]
        id = slug[1]
    }

    if (entity == 'event') {
        if (req.method === 'GET') {
            // TODO: QUERY
            res.status(200).json({ error: 'TODO'})
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
    }
    else if (entity == 'role') {
        if (req.method === 'GET') {
            // TODO: QUERY
            res.status(200).json({ error: 'TODO'})
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
    }
    else if (entity == 'shift') {
        if (req.method === 'GET') {
            // TODO: QUERY
            res.status(200).json({ error: 'TODO'})
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
    }
    else if (entity == 'user') {
        if (req.method === 'GET') {
            // TODO: QUERY
            res.status(200).json({ error: 'TODO'})
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
    }
    else if (entity == 'comment') {
        if (req.method === 'GET') {
            // TODO: QUERY
            res.status(200).json({ error: 'TODO'})
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
    }
    else if (entity == 'ping') {
        // FIXME: Not needed
        res.status(200).json({ping: 'pong'})
    }
    else if (entity == 'reset') {
        // FIXME: Delete when ready
        await create_db()
        res.status(200).json(await query())
    }
    else {
        res.status(405).json({error: 'No such entity.'})
    }
}