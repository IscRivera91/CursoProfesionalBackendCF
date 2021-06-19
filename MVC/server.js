const express = require('express');
const mysql   = require('mysql');

const app = express();

app.use(express.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'curso-backend'
});


connection.connect();

process.on('SIGINT',function(){
    console.log('Bye ...');
    connection.end();
    process.exit();
});

function runQuery(query,params = {}){
    connection.query(query,params, function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

app.get('/', function(request, response){
    response.send('Holis');
});

app.listen(3000);