/**
 * 
 * Functions that make API access easier from the client. 
 * 
 */

function base_url() {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
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
        administrators: event.administrators,
    }
    return fetch(base_url() + '/api/event/' + update.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(update)
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

