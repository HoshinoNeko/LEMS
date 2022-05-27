const sql = require('./src/model/db.js')
const id = 1
sql.query("UPDATE incident set done = 2 where id = ?", id ,(err, callback) => {
    if (err) {
        console.log("s1 err")
    } else {
        sql.query("select instrument_id from incident where id = ?", id, (err,callback) => {
            if (err) {

            } else {
                console.log(callback[0].instrument_id)

            }
        })
    }
})
