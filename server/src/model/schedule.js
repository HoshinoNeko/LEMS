const sql = require('./db.js')

const newSchedule = (user_id, instrument_id, duration, remark, callback) => {
    if (user_id && instrument_id && duration) {
        remark = '"' + remark + '"'
    sql.query(`INSERT INTO schedule (user_id, instrument_id, rent_date, duration, remark) VALUES (?, ?, now(), ?, ?)`, [user_id, instrument_id, duration, remark], (err, res) => {
        if (err) {
            callback(err)
        } else {
            sql.query(`update instrument set occupied = 1 where id = ?`, instrument_id, (err, res) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null,res)
                }
            })
        }
    })
}}

const getAll = (callback) => {
    sql.query('SELECT * FROM schedule', (err, res) => {
        if (err) {
            console.log("error: ", err)
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

const getByUser = (user_id, callback) => {
    sql.query(`SELECT * FROM schedule WHERE user_id = ? ORDER BY rent_date DESC`, user_id, (err, res) => {
        if (err) {
            callback({
                status: 1,
                message: 'Error: ' + err
            })
        } else {
            callback({
                status: '0',
                message: 'Success',
                data: res
            })
        }
    })
}

const getByDevice = (instrument_id, callback) => {
    sql.query(`SELECT * FROM schedule WHERE id = ?`, instrument_id, (err, res) => {
        if (err) {
            callback({
                status: 1,
                message: 'Error: ' + err
            })
        } else {
            callback({
                status: '0',
                message: 'Success',
                data: res
            })
        }
    })
}

module.exports = {
    newSchedule,
    getAll,
    getByUser,
    getByDevice
}
