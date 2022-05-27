const sql = require('./db.js')

const newIncident = (uid, iid, title, content , callback) => {
    sql.query("INSERT INTO incident SET user_id = ?, instrument_id = ?, title = ?, content = ?, done = 1", [uid, iid, title, content], (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            callback(null);
        }
    });
};

const getAllIncident = (result) => {
    sql.query("SELECT * FROM incident ORDER BY done DESC, date DESC", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

const confirmIncident = (id, result) => {
    sql.query("UPDATE incident set done = 2 where id = ?", id ,(err, callback) => {
        if (err) {
            return result(err)
        } else {
            sql.query("select instrument_id from incident where id = ?", id, (err, callback) => {
                if(err) {
                    return result(err)
                } else {
                    sql.query("update instrument set enable = 1 where id = ?", callback[0].instrument_id, (err, callback) => {
                        if(err) {
                            return result(err)
                        } else {
                            return result(null, callback)
                        }
                    })
                }
            })
        }
    })
}

const solveIncident = (id, result) => {
    sql.query("UPDATE incident SET done = 0 WHERE id = ?", [id], (err, res) => {
        if (err) {
            result(err)
        } else {
            sql.query("select instrument_id from incident where id = ?", id, (err, res) => {
                sql.query("UPDATE instrument set enable = 0 where id = ?", res[0].instrument_id, (err, res) =>{
                    if(err) {
                        result(err)
                    } else {
                        result(null, res)
                    }
                })
            })
        }
    });
}

const deleteIncident = (id, result) => {
    sql.query("DELETE FROM incident where id = ?", id ,(err, res) => {
        if (err) {
            result(err)
        } else {
            result(null, res)
        }
    })
}

const getIncidentById = (id, result) => {
    sql.query("SELECT * FROM incident WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("incident: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Incident with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = {
    newIncident,
    getAllIncident,
    solveIncident,
    deleteIncident,
    getIncidentById,
    confirmIncident,
};
