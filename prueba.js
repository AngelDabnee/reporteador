var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos"
  });
  function queryProductos(query) {
    let consulta = '';
    switch (query) {
        case 1:
            consulta = 'SELECT count(*) FROM ventas;';
            break;
        case 2:
            consulta = 'SELECT * FROM ventas ORDER BY fecha ASC limit 1;';
            break;
        case 3:
            consulta = 'SELECT * FROM ventas ORDER BY fecha DESC limit 1;';
            break; 
        case 4:
            consulta = 'SELECT SUM(cantidad) FROM ventas_detalle;';
            break;
        case 5:
            consulta = 'SELECT nombre, SUM(cantidad) FROM ventas_detalle GROUP BY nombre;';
            break;
        case 6:
            consulta = 'SELECT nombre, SUM(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY SUM(cantidad) DESC LIMIT 1;';
            break;
        case 7:
            consulta = 'SELECT nombre, SUM(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY SUM(cantidad) ASC LIMIT 1;';
            break;
        case 8:
        consulta = 'SELECT productos.nombre,ventas_detalle.nombre FROM productos left JOIN ventas_detalle using(nombre) where ventas_detalle.nombre is null;';
            break;
        case 9:
            consulta = 'SELECT SUM(cantidad*precio) FROM ventas_detalle;';
            break; 
        case 10:
            consulta = 'SELECT id_venta,fecha,hora,SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY id,fecha,hora;';
            break;
        case 11:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha);';
            break;
        case 12:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha) DESC LIMIT 1;';
            break;       
        case 13:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha) ASC LIMIT 1;';
            break;
        case 14:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha);';
            break; 
        case 15:
            consulta = 'SELECT year, nombre, cantidad FROM (SELECT YEAR(fecha) AS year, nombre, SUM(cantidad) AS cantidad, RANK() OVER (PARTITION BY YEAR(fecha) ORDER BY SUM(cantidad)) AS rnk FROM ventas_detalle INNER JOIN ventas ON id_venta = id GROUP BY YEAR(fecha), nombre) AS subquery WHERE rnk = 1 ORDER BY year;';
            break;
        case 16:
            consulta = 'SELECT year, nombre, cantidad FROM (SELECT YEAR(fecha) AS year, nombre, SUM(cantidad) AS cantidad, RANK() OVER (PARTITION BY YEAR(fecha) ORDER BY SUM(cantidad) DESC) AS rnk FROM ventas_detalle INNER JOIN ventas ON id_venta = id GROUP BY YEAR(fecha), nombre) AS subquery WHERE rnk = 1 ORDER BY year ASC;';
            break;
        case 17:
            consulta = 'SELECT * FROM productos';
            break;                                                            
        default:
            break;
    }

    return new Promise((resolve, reject) => {
        con.connect();
        con.query(consulta, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function reporte(query) {
    try {
        const results = await queryProductos(query);
        console.log(results);
    } catch (error) {
        console.error(error);
    } finally {
        con.end();
    }
}

reporte(11).then(()=>{
    process.exit();
});
