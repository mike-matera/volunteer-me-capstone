import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { create_role } from '../lib/api'
import Router from 'next/router'

import {
    create_shift,
    delete_shift,
    put_shift,
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
        put_shift(this.props.shift)
            .then(result => {
                console.log('SUCCESS: ', result)
                Router.reload(window.location.pathname);
            })
            .catch(error => {
                console.log('ERROR!')
                Router.reload(window.location.pathname);
            })
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
                console.log('ERROR:', error);
            })
    }

    handleChange(event) {
        console.log('Change event', event.target.value)
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

            const textbox={
                    height:'100px',
            }
            const styleediting={
                    backgroundColor: 'blue',
            }

            return (
                <>
                <tr style={{background:'linear-gradient(to right,#a6bace 0%,#0588d8 100%)'}}>                    
                <td>
                    <input type="text" id="title" value={this.props.shift.title} onChange={this.handleChange}/><br/>
                    <input className='textbox' cols="40" rows="5" id="description" placeholder="Enter shift description" value={this.props.shift.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="text" id="location" value={this.props.shift.location} onChange={this.handleChange}/><br/>
                </td>
                <td>
                <label>
                <DatePicker
                    selected={d}
                    onChange={this.handleChangeDate} //only when value has changed
                    showTimeSelect showTimeInput
                />    
                </label>                
                </td>
                </tr>
                <tr style={{marginTop:'50px'}}>
                <Button variant="success" style={{ backgroundColor: "#21ba45",borderColor: "#21ba45"}} onClick={() => {this.doUpdate()}}>Done</Button>
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
                    { this.props.shift.start && (moment(this.props.shift.start).format("MMMM Do YYYY, h:mm:ss a"))}{" "}
                </td>
                <td style={{whiteSpace:"nowrap", paddingLeft: "0px"}}>
                    <Button id="editButton" variant="outline-success" onClick={() => {this.doEdit()}}>Edit</Button>
                    <Button id="deleteButton" variant="outline-danger" onClick={() => {this.doDelete()}}>Delete</Button>
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
                Router.reload(window.location.pathname);
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
            <Table striped responsive hover className="shiftTable">
                <thead>
                <tr>
                    <th>Shift Name</th>
                    <th>Where</th>
                    <th>When</th>
                </tr>
            </thead>
            <tbody>                                
            {
                shifts.map((shift) => {
                    return (
                        <ShiftRow key={shift.id} shift={shift}/>
                    )
                })            
            }
            </tbody>
            </Table>
            <Button onClick={() => this.doAdd()} style={{color: "#fff",backgroundColor: "#21ba45",borderColor:"#21ba45",marginTop: "10px"}}>Add Shift</Button>
            </form>
        )
    }    
}

