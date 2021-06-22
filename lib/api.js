/**
 * 
 * Functions that make API access easier from the client. 
 * 
 */

function base_url() {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
}

/**
 * CREATE an event
 * 
 * @returns A promise for new event data in JSON
 */
export async function create_event() {
    return fetch(base_url() + '/api/event/newevent', {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => response.json())
}

/**
 * UPDATE event 
 * 
 * @param {*} event 
 * @returns 
 */
export async function put_event(event) {
    let update = {
        id: event.id,
        title: event.title, 
        description: event.description,
        status: event.status,
    }
    return fetch(base_url() + '/api/event/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
    })
    .then(response => response.json())   
}

/**
 * DELETE an event. 
 * 
 * @param {*} event 
 * @returns 
 */
export async function delete_event(event) {
    return fetch(base_url() + '/api/event/' + event.id, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(event)
    })
    .then(response => response.json())   
}

/**
 * UPDATE user 
 * 
 * @param {*} user 
 * @returns 
 */
export async function put_user(user) {
    let update = {
        id: user.id,
        email: user.email, 
        name: user.name,        
    }
    return fetch(base_url() + '/api/user/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
    })
    .then(response => response.json())   
}

/**
 * CREATE role 
 * 
 * @param {*} event_id 
 * @returns 
 */
export async function create_role(event_id) {
    return fetch(base_url() + '/api/role/hidevon', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({event: event_id})
    })
    .then(response => response.json())
}

/**
 * UPDATE role 
 * 
 * @param {*} role 
 * @returns 
 */
export async function put_role(role) {
    let update = {
        id: role.id,
        title: role.title,
        description: role.description,
        status: role.status,
    }
    return fetch(base_url() + '/api/role/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
    })
    .then(response => response.json())   
}

/**
 * 
 * DELETE a role
 * 
 * @param {} role 
 * @returns 
 */
export async function delete_role(role) {
    return fetch(base_url() + '/api/role/' + role.id, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(role)
    })
    .then(response => response.json())   
}

/**
 * CREATE shift 
 * 
 * @param {*} role_id 
 * @returns 
 */
export async function create_shift(role_id) {
    return fetch(base_url() + '/api/shift/newshift', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({role: role_id})
    })
    .then(response => response.json())
}

/**
 * UPDATE shift
 * 
 * @param {*} shift 
 * @returns 
 */
export async function put_shift(shift) {
    let update = {
        id: shift.id,
        title: shift.title,
        description: shift.description,
        location: shift.location, 
        start: shift.start, 
        duration: shift.duration,        
    }
    return fetch(base_url() + '/api/shift/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
    })
    .then(response => response.json())   
}

/**
 * DELETE a shift
 * 
 * @param {*} shift 
 * @returns 
 */
export async function delete_shift(shift) {
    return fetch(base_url() + '/api/shift/' + shift.id, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(shift)
    })
    .then(response => response.json())   
}

/**
 * UPDATE comment
 * 
 * @param {*} comment 
 * @returns 
 */
export async function put_comment(comment) {
    let update = {
        id: comment.id,
        comment: comment.comment,
    }
    return fetch(base_url() + '/api/comment/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
    })
    .then(response => response.json())   
}

