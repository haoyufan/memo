/**
 * Author: silence
 * Create Time: 2018-09-26 14:59
 * Description:
 */
const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'info',
    connectionLimit: 100,
    multipleStatements: true,
    insecureAuth: true
})

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
        if (err) {
            reject( err )
        } else {
            connection.query(sql, values, ( err, rows) => {
                if ( err ) {
                    reject( err )
                } else {
                    resolve( rows )
                }
                connection.release()
        })
        }
    })
})
}

module.exports = { query }