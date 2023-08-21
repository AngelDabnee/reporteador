var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos"
  });

async function fetchData() {
  return new Promise((resolve, reject) => {
    con.connect();
    const query = "SELECT * FROM productos";
    con.query(query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(fields);
      }
    });
  });
}  
async function main() {
  try {
    const fields = await fetchData();
    console.log(fields);
  } catch (error) {
    console.error(error);
  } finally {
    con.end();
   }
}  
main();