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
    sql.query("select * from ireturn where s_id = ?", [s_id], (err, res) => {
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
    sql.query("select * from ireturn", (err, res) => {
        if (err) {
            console.log("error: ", err);
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
    sql.query("select * from ireturn where done = 1", (err, res) => {
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
    getUndoneReturn
}
