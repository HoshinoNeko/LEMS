const sql = require('./db.js')

const addReturn = (s_id, i_id, result) => {
    sql.query("insert into ireturn set s_id = ?, i_id = ?", [s_id, i_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("add return: ", res.insertId);
        result(null, res.insertId);
    })
}

const getReturnByID = (s_id, result) => {
    sql.query("select * from ireturn where s_id = ?", [s_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("get return: ", res[0]);
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
            result(null, err);
            return;
        }
        console.log("get all return: ", res);
        result(null, res);
    })
}

const approveReturn = (id, result) => {
    sql.query("update ireturn set done = 0 where id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("approve return: ", res);
    })
    sql.query("update instrument set occupied = 1 where id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("approve return: ", res);
    })
}

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
