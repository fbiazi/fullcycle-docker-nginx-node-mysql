const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config);
const createTable = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id)) `;
connection.query(createTable,  (err, result) => {
    console.log("Tabela criada")
})                     

app.get('/', async (req,res) => {
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('Biazi')`
    connection.query(sql)
    connection.query("SELECT name FROM people", function (err, result, fields) {
        if (err) throw err;

        var myObj = result.map(user => `${user.name}`);
        var nameList = "<ol>"
        Object.keys(myObj).forEach(key => console.log(nameList = nameList+"<li>"+myObj[key])+"</li>");
        
        res.send(`<h1>Full Cycle Rocks!</h1> <br> <h2>Nomes cadastrados</h2> `+nameList+`</ol>`)

        //Object.keys(myObj).forEach(key => console.log(myObj[key]));
        //console.log(result.map(user => `${user.name}`));
        //console.log(typeof(result.map(user => `${user.name}`)));
      });
    connection.end()

})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})