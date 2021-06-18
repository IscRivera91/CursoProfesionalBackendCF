const express = require('express');
const mysql   = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'curso-backend'
});

app.get('/crearTabla',function(request, response){
    connection.connect();

    response.send(
        runQuery('CREATE TABLE tasks (id int, description varchar(250))')
    );

    connection.end();
});

app.listen(3000);

function runQuery(query){
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}