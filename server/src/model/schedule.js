const sql = require('./db.js')

const newSchedule = (user_id, instrument_id, duration, remark, callback) => {
    if (user_id && instrument_id && duration) {
    sql.query(`INSERT INTO schedule (user_id, instrument_id, rent_date, duration, remark) VALUES (${user_id}, ${instrument_id}, now(), ${duration}, ${remark})`, (err, res) => {
        if (err) {
            callback({
                status: 1,
                message: 'Error: ' + err
            })
        } else {
            sql.query(`update instrument set occupied = 0 where id = ${instrument_id}`, (err, res) => {
                if (err) {
                    callback({
                        status: 1,
                        message: 'Error: ' + err
                    })
                } else {
                    callback({
                        status: 0,
                        message: 'Success'
                    })
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
    sql.query(`SELECT * FROM schedule WHERE user_id = ${user_id} ORDER BY rent_date DESC`, (err, res) => {
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
    sql.query(`SELECT * FROM schedule WHERE id = ${instrument_id}`, (err, res) => {
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
