const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
const criaTabela = `
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )
`;

connection.query(criaTabela, (err, results) => {
  if (err) throw err;
  console.log('Table created or already exists');
});

function insertAndFetchData(callback) {
    let insert1 = "INSERT INTO people(name) values ('joao')";
    let insert2 = "INSERT INTO people(name) values ('maria')";
    let insert3 = "INSERT INTO people(name) values ('Selenio')";

    connection.query(insert1, (error) => {
        if (error) throw error;
        connection.query(insert2, (error) => {
            if (error) throw error;
            connection.query(insert3, (error) => {
                if (error) throw error;

                let select = "SELECT * FROM people";
                connection.query(select, (error, results, fields) => {
                    if (error) throw error;
                    callback(results);
                });
            });
        });
    });
}
let resp = `<h1>Full Cycle Rocks!</h1>`;
	resp +=  'ID | NOME <br>';

insertAndFetchData((results) => {
	results.forEach(row => {
		resp += `<br>${row.id} | ${row.name}`;
	})
    connection.end();
});

app.get('/', (req,res) => {
	res.send(resp)
})

app.listen(port, () => {
	console.log('Rodando na porta '+ port)
})
