'use strict';

import { v4 as uuidv4 } from 'uuid';

var _mysql = null;
var _con = null; 
var _db = null; 

function check_db() {
    if (_mysql == null) {
        const util = require( 'util' );
        _mysql = require('mysql');
        _con = _mysql.createConnection({
            host: "db",
            user: "root",
            password: "root",
            multipleStatements: true
          });
        //await util.promisify(_con.connect).call()
        _db = {
            query(sql, args) {
                return util.promisify(_con.query)
                    .call(_con, sql, args)
            },
            close() {
                return util.promisify(_con.end).call(_con)
            }
        }
    }
    return _db
}

// Completley reset the db schema.
export async function create_db() {
    const db = check_db();
    const event1 = uuidv4();
    const role1 = uuidv4();
    const shift1 = uuidv4();

    let sql = `
    drop schema if exists volunteer;
    create schema if not exists volunteer; 

    /* Drop all tables so that the DB is reset */
    drop table if exists volunteer.shift;
    drop table if exists volunteer.role;
    drop table if exists volunteer.event; 

    /* Create all tables */
    create table volunteer.event (
        id varchar(36) primary key, 
        name varchar(64),
        description varchar(128)
    ); 

    create table volunteer.role (
        id varchar(36) primary key, 
        name varchar(64),
        description varchar(128),
        eventid varchar(36),
        constraint sk_role_1 foreign key (eventid) references event(id) 
    ); 

    create table volunteer.shift (
        id varchar(36) primary key, 
        name varchar(64),
        description varchar(128),
        location varchar(36),
        starttime date,
        roleid varchar(36),
        constraint sk_shift_1 foreign key (roleid) references role(id) 
    );

    /* Add sample data */
    insert into volunteer.event values ('${event1}', 'Summer Fundraiser', 'Our big annual fundraiser.');
    insert into volunteer.role values ('${role1}', 'Chef', 'Works in kitchen.', '${event1}');
    insert into volunteer.shift values ('${shift1}', 'Day', 'Hours 8-12', 'Front Gate', '2021-03-22', '${role1}');
    
    `
    console.log('resetting db')
    var got = await db.query(sql)
}

// Insert a new row into table...
export async function insert(item) {
    console.log("Insert:", item)
    const db = check_db();
    var query
    if (item.kind == 'event') {
        query = `insert into volunteer.event values ('${item.id}', '${item.name}', '${item.description}');`
    }
    else if (item.kind == 'role') {
        query = `insert into volunteer.role values ('${item.id}', '${item.name}', '${item.description}', '${item.eventid}');`
    }
    else if (item.kind == 'shift') {
        query = `insert into volunteer.shift values ('${item.id}', '${item.name}', '${item.description}', '${item.location}',
        '${item.starttime}', '${item.parent}');`
    }
    console.log("Query:", query)
    var got = await db.query(query)
}

// Update a row... 
export async function update(item) {
    console.log("Update:", item)
    const db = check_db();
    var query
    if (item.kind == 'event') {
        query = `update volunteer.event set name = '${item.name}', description = '${item.description}' where id = '${item.id}';`
    }
    else if (item.kind == 'role') {
        query = `update volunteer.role set name = '${item.name}', description = '${item.description}' where id = '${item.id}';`
    }
    else if (item.kind == 'shift') {
        query = `update volunteer.shift set name = '${item.name}', description = '${item.description}', location = '${item.location}', starttime = '${item.starttime}' where id = '${item.id}';`
    }
    console.log("Query:", query)
    var got = await db.query(query)
}

// Delete a row... 
export async function del(item) {
    console.log("Delete:", item)
    const db = check_db();
    var query
    if (item.kind == 'event') {
        query = `delete from volunteer.shift where id = '${item.id}';`
    }
    else if (item.kind == 'role') {
        query = `delete from volunteer.shift where id = '${item.id}';`
    }
    else if (item.kind == 'shift') {       
       query = `delete from volunteer.shift where id = '${item.id}';`
    }
    console.log("Query:", query)
    var got = await db.query(query)
}

// Dump the DB into JSON IR... 
export async function query() {
    const db = check_db();

    var dbdata = {}
    var pagedata = []
    var status = "ok"
    try {
        var events = await db.query('select * from volunteer.event;', [])
        for (const event_row of events) {
            var event = {}
            event.kind = 'event'
            event.id = event_row.id 
            event.name = event_row.name
            event.description = event_row.description
            event.parent = null 
            event.children = []
            dbdata[event.id] = event;
            pagedata.push(event.id)

            var roles = await db.query('select * from volunteer.role where eventid = ?;', [event.id])
            for (const role_row of roles) {
                var role = {}
                role.kind = 'role'
                role.id = role_row.id
                role.name = role_row.name
                role.description = role_row.description
                role.eventid = role_row.eventid
                event.children.push(role.id)
                role.parent = event.id
                role.children = []            
                dbdata[role.id] = role;

                var shifts = await db.query('select * from volunteer.shift where roleid = ?;', [role.id])
                for (const shift_row of shifts) {
                    var shift = {}
                    shift.kind = 'shift'
                    shift.id = shift_row.id
                    shift.name = shift_row.name
                    shift.description = shift_row.description
                    shift.location = shift_row.location
                    shift.starttime = String(shift_row.starttime)
                    shift.roleid = shift_row.roleid
                    role.children.push(shift.id)
                    shift.parent = role.id
                    shift.children = []
                    dbdata[shift.id] = shift
                }

            }
        }
    }
    catch (error) { 
        console.log("Error querying the DB.", error)
        status = 'error'
    }
    console.log(dbdata)
    return {
        page: pagedata,
        db: dbdata,
        status: status,
    }
}
