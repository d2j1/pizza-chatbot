const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const bearerToken=require('express-bearer-token');
const event=require('./events');


const connection = mysql.createConnection( {

    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'chatbot'
});

port=3333;
connection.connect();

const app=express()
.use(cors())
.use(bodyParser.json())
.use(bearerToken())
.use(event(connection));

app.listen(port, ()=>{
    console.log(`express seerver listening on port ${port}`);
});


