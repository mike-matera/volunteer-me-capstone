import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import DatePicker from 'react-datepicker'
import { create_role } from '../lib/api'
import Router from 'next/router'
import {
    create_shift,
    delete_shift
} from '../lib/api'


import { v4 as uuidv4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";

export class ShiftRow extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        super.state = {
            mode: 'view',
        }    
    }

    doEdit() {
        this.setState({
            mode: 'edit',
        })
    }

    doUpdate() {
        this.setState({
            mode: 'view',
        })
    }
    doDelete(){
        delete_shift(this.props.shift)
            .then(result => {
                Router.reload(window.location.pathname);
            })
            .catch(error => {
                // TODO: Reload this page on error.
                console.log('ERROR:', error);
            })
    }

    handleChange(event) {
        const updated = this.props.shift 
        if (event instanceof Date) {            
            updated.starttime = event.toLocaleDateString() + " " + event.toLocaleTimeString()
        }
        else {
            updated[event.target.id] = event.target.value    
        }
        this.props.app.update(updated)
    }

    handleSelect(event) {
        console.log("SELECT:", event)
    }

    render() {
        let d;
        if (this.state.mode == 'edit') {
            
             d=new Date(this.props.shift.start)
             if(isNaN(d)){
                 d=Date.now()
             }
            
            console.log('outside', d)
            return (
                <>
                <tr>                    
                <td>
                    <input type="text" id="name" value={this.props.shift.title} onChange={this.handleChange}/><br/>
                    <textarea cols="40" rows="5" id="description" value={this.props.shift.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="text" id="location" value={this.props.shift.location} onChange={this.handleChange}/><br/>
                </td>
                <td>
                <DatePicker id="starttime"
                    selected={d}
                    onChange={this.handleChange} //only when value has changed
                    showTimeSelect showTimeInput
                />                    
                </td>
                </tr>
                <tr>
                <Button variant="success" onClick={() => {this.doUpdate()}}>Done</Button>
                </tr>
                </>
            )            
        }
        else {
            return (
                <tr>
                <td>
                    <b>{this.props.shift.title}</b><br/>
                    {this.props.shift.description}
                </td>
                <td>
                    {this.props.shift.location}
                </td>
                <td>
                    {this.props.shift.start}
                </td>
                <td>
                    <Button variant="outline-success" onClick={() => {this.doEdit()}}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => {this.doDelete()}}>Delete</Button>
                </td>
                </tr>
            )        
        }
    }
}

export default class ShiftList extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    doAdd() {
        create_shift(this.props.role.id)
            .then(result => {
            Router.reload(window.location.pathname);
        })
            .catch(error => {
            // TODO: Reload this page on error.
            console.log('ERROR:', error)
        })
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        const shifts = this.props.shifts
        return (
            <form onSubmit={this.handleSubmit}>
            <Table striped hover className="shiftTable">
                <thead>
                <tr>
                    <th>What</th>
                    <th>Where</th>
                    <th>When</th>
                </tr>
            </thead>
            <tbody>                                
            {
                shifts.map((shift) => {
                    return (
                        <ShiftRow key={shift.id} app={this.props.app} shift={shift}/>
                    )
                })            
            }
            </tbody>
            </Table>
            <Button onClick={() => this.doAdd()} variant="outline-success">Add Shift</Button>
            </form>
        )
    }    
}

