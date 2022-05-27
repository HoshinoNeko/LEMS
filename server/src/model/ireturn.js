const sql = require('./db.js')

const addReturn = (s_id, i_id, result) => {
    sql.query("insert into ireturn set s_id = ?, i_id = ?", [s_id, i_id], (err, res) => {
        if (err) {
            result(err);
            return;
        }
        result(null, res.insertId);
    })
}

const getReturnByID = (s_id, result) => {
    sql.query("select r.*, u.sname as uname, i.name as iname from ireturn r, user u, instrument i where u.id = r.s_id AND i.id = r.i_id AND r.s_id = ?", [s_id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    })
}

const getAllReturn = (result) => {
    sql.query("select r.*, u.sname as uname, i.name as iname from ireturn r, user u, instrument i where u.id = r.s_id AND i.id = r.i_id", (err, res) => {
        if (err) {
            return;
        }
        result(null, res);
    })
}

const approveReturn = (id, i_id, result) => {
    sql.query("update ireturn set done = 0 where id = ?", id, (err, res) => {
        if (err) {
            result(err);
        } else {
            sql.query("update instrument set occupied = 0 where id = ?",i_id, (err, res) => {
                if (err) {
                    result(err)
                } else {
                    sql.query("update schedule set done = 0 where instrument_id = ?", i_id, (err, res) =>{
                        if (err) {
                            result(err)
                        } else {
                            result(null, res)
                        }
                    })
                }
            })
        }
    })
}

const rejectReturn = (id, result) => {
    sql.query("UPDATE schedule set done = 2  WHERE 1 ORDER BY id DESC LIMIT 1", (err, callback) => {
        if (err) {
            result(err)
        } else {
            result(null, callback)
            sql.query("UPDATE ireturn set done = 2 where id = ?", id)
        }
    })
}
/*
const approveReturn = (id, result) => {
    sql.query("update ireturn set done = 0 where id = ?", [id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
    })
}
*/
const getUndoneReturn = (result) => {
    sql.query("select r.*, u.sname as uname, i.name as iname from ireturn r, user u, instrument i where u.id = r.s_id AND i.id = r.i_id AND ( done = 1 OR done = 2 )", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("get undone return: ", res);
        result(null, res);
    })
}

module.exports = {
    addReturn,
    getReturnByID,
    getAllReturn,
    approveReturn,
    getUndoneReturn,
    rejectReturn
}
