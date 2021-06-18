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

app.get('/crearTabla', function(request, response){
    runQuery('DROP TABLE IF EXISTS tasks');
    runQuery('CREATE TABLE tasks  (id int(11) NOT NULL AUTO_INCREMENT,description varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL, PRIMARY KEY (id) USING BTREE ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic');
    response.send('tabla creada');
});

app.post('/insert', function(request, response){
    runQuery("INSERT INTO tasks (description) VALUES (?)",[request.body.description]);
    response.send('registro exitoso');
});


app.listen(3000);