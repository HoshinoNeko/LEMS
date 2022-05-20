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

const doIncident = (id, result) => {
    sql.query("UPDATE incident SET done = 0 WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Incident with the id
            result({status: "1", msg: "Incident Not found"}, null);
            return;
        }

        result(null, {status: "0", msg: "Incident done"});
    });
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
    doIncident,
    getIncidentById,
};
