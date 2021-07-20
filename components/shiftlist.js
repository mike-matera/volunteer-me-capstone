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
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.state = {
            mode: 'view',
            event: props.shift,
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
        console.log(event.target.id)
        let newevent = this.state.event
        newevent[event.target.id] = event.target.value
        this.setState({
            event: newevent,
        })
    }
    handleChangeDate(event){
        console.log('Date event',event)
        let newevent = this.state.event
        newevent['start'] = event.toISOString();
        this.setState({
            'event': newevent,
        })
        console.log('DATE STATE', this.state.event)
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
                    <input type="text" id="title" value={this.props.shift.title} onChange={this.handleChange}/><br/>
                    <input cols="40" rows="5" id="description" value={this.props.shift.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="text" id="location" value={this.props.shift.location} onChange={this.handleChange}/><br/>
                </td>
                <td>
                <DatePicker
                    selected={d}
                    onChange={this.handleChangeDate} //only when value has changed
                    showTimeSelect showTimeInput
                />                    
                </td>
                <td>
                <Button variant="success" onClick={() => {this.doUpdate()}}>Done</Button>
                </td>
                </tr>
                <tr>
                
                </tr>
                </>
            )            
        }
        else {
            return (
                <tr>
                <td>
                    {this.props.shift.title}
                    <br></br>
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
        this.doUpdate()
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

