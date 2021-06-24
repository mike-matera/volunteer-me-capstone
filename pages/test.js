import Button from 'react-bootstrap/Button'

import {
    create_role,
    delete_role,
    create_shift,
    delete_shift,
}from '../lib/api'

function creater(ev) {
    create_role('3e87e03c-b6ff-4d72-b075-fe30c4425081')
}

function delr(ev) {
    delete_role({id: '8c0831e0-61c8-4327-8020-3be0066d6d20'})
}

function creates(ev) {
    create_shift('86a2cfb9-2fe4-4c1a-80fb-4b939205089c')
}

function dels(ev) {
    delete_shift({id: '8d54f263-afa2-489e-bc8e-20785323ee72'})
}

export default function Test(props) {
    return (
        <>
        <Button onClick={creater}>Click Me to add a Role</Button>
        <br/>
        <br/>
        <Button onClick={delr}>Click Me to delete a Role</Button>
        <br/>
        <br/>
        <Button onClick={creates}>Click Me to create a Shift</Button>
        <br/>
        <br/>
        <Button onClick={dels}>Click Me to delete a Shift</Button>
        </>
    )

}