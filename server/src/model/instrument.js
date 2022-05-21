const sql = require('./db.js')

const Device = function(device) {
  this.id = device.id
  this.name = device.name
  this.symbol = device.symbol
  this.location = device.location
  this.instruction = device.instruction
  this.enable = device.enable
  this.remark = device.remark
  this.add_date = device.add_date
  this.department = device.department
}

const newDevice = (name,symbol,location,instruction,enable,remark,department, callback) => {
    sql.query(`INSERT INTO instrument (name,symbol,location,instruction,enable,remark,department) VALUES ('${name}','${symbol}','${location}','${instruction}','${enable}','${remark}','${department}')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

const editDevice = (id,name,symbol,location,instruction,enable,remark,add_date,department, callback) => {
    sql.query(`UPDATE instrument SET name='${name}',symbol='${symbol}',location='${location}',instruction='${instruction}',enable='${enable}',remark='${remark}',add_date='${add_date}',department='${department}' WHERE id='${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

const delDevice = (id, callback) => {
    sql.query(`DELETE FROM instrument WHERE id='${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(null, err);
            return;
        }
        console.log("device: ", res);
        callback(res);
    });
}

const getDevice = (id, callback) => {
    sql.query(`SELECT * FROM instrument WHERE id='${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

const getAllDevice = (callback) => {
    sql.query(`SELECT * FROM instrument`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

const disableDevice = (id, callback) => {
    sql.query(`update instrument set enable = 1 where id = ${id}`, (err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res)
        }
    })
}

const enableDevice = (id, callback) => {
    sql.query(`update instrument set enable = 0 where id = ${id}`, (err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res)
        }
    })
}

const isAvailableDevice = (id, callback) => {
    sql.query(`SELECT * FROM instrument where id = ${id} and occupied = 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

const getAvailableDevices = (callback) => {
    sql.query(`SELECT * FROM instrument where enable = 0 and occupied = 0`, (err, res) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, res);
    });
}

const deviceNum = (callback) => {
    sql.query(`SELECT COUNT(*) FROM instrument`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        callback(null, res);
    });
}

const freeDevice = (id, callback) => {
    sql.query(`UPDATE instrument SET occupied = 1 WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err);
            return;
        }
        console.log("device: ", res);
        callback(null, res);
    });
}

module.exports = {
    Device,
    newDevice,
    editDevice,
    delDevice,
    getDevice,
    getAllDevice,
    deviceNum,
    getAvailableDevices,
    freeDevice,
    disableDevice,
    enableDevice,
}
