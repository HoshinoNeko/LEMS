const sql = require('./db.js')

const getUsers = (req, res) => {
     sql.query("select COUNT(*) as users from user", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
const getDevices = (req, res) => {
    sql.query("select COUNT(*) as devices from instrument", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
const getTodayRents = (req, res) => {
    sql.query("select COUNT(*) as rents from schedule where TO_DAYS(rent_date) = TO_DAYS(NOW())", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
const getTodayReturns = (req, res) => {
    sql.query("select COUNT(*) as returns from ireturn where TO_DAYS(date) = TO_DAYS(NOW())", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
const getWaitReturns = (req, res) => {
    sql.query("select COUNT(*) as waitreturn from ireturn where done = 1", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
const getWaitIncidents = (req, res) => {
    sql.query("select COUNT(*) as waitincident from incident where done = 1", (err, callback) => {
        if (err) {
            res(err)
        } else {
            res(null, callback)
        }
    })
}
module.exports = {
    getDevices,
    getUsers,
    getWaitIncidents,
    getWaitReturns,
    getTodayRents,
    getTodayReturns,
}
