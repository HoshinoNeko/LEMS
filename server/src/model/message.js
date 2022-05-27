const sql = require('./db.js')

const Message = function(message) {
    this.id = message.id
    this.rid = message.rid
    this.sid = message.sid
    this.direction = message.direction
    this.content = message.content
    this.date = message.date
}

const addMessage = (rid, uid, direction, content, callback) => {
    sql.query("INSERT INTO message set rid = ?, uid= ?, direction = ?, content =?", [rid, uid, direction, content], (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

const getMessage = (rid, callback) => {
    sql.query("SELECT * from message where rid = ? ORDER BY date DESC", rid, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

module.exports = {
    addMessage,
    getMessage
}
