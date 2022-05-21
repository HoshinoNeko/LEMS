const sql = require('./db.js')

const createNotice = (uid, title, content, res) => {
    sql.query(`insert into announcement set user_id = ?, title = ?, content = ?`, [uid, title, content], (err, result) => {
        if (err) {
            res(err)
        } else {
            res(null, result)
        }
    })
}

const deleteNotice = (id, res) => {
    sql.query(`delete from announcement where id = ?`, id, (err, result) => {
        if (err) {
            res(err)
        } else {
            res(null, result)
        }
    })
}

const getNotice = (res) => {
    sql.query(`select * from announcement ORDER BY add_date DESC`, (err, result) => {
        if (err) {
            res(err)
        } else {
            res(null, result)
        }
    })
}

module.exports = {
    createNotice,
    deleteNotice,
    getNotice,
}
