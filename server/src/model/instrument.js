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

const newDevice = (id,name,symbol,location,instruction,enable,remark,add_date,department, callback) => {
    sql.query(`INSERT INTO instrument (id,name,symbol,location,instruction,enable,remark,add_date,department) VALUES ('${id}','${name}','${symbol}','${location}','${instruction}','${enable}','${remark}','${add_date}','${department}')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(null, err);
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
            callback(null, err);
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
        callback(null, res);
    });
}

const getDevice = (id, callback) => {
    sql.query(`SELECT * FROM instrument WHERE id='${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(null, err);
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
            callback(null, err);
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
    getAllDevice
}
