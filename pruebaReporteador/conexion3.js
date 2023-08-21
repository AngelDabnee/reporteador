var mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos"
  });
const queryPromise = util.promisify(con.query).bind(con);
async function reporte() {
  try {
    const query = "SELECT * FROM productos";  
    const result = await queryPromise(query);
      console.log(result);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
  }
}  
(async () => {
  await reporte();
  process.exit(); // Salir después de que la consulta haya finalizado
})();