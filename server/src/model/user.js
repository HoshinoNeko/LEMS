const sql = require('./db.js')

const User = function(user) {
    this.id = user.id
    this.s_id = user.s_id
    this.sname = user.sname
    this.email = user.email
    this.password = user.password
    this.enable = user.enable
    this.reg_date = user.reg_date
    this.reg_ip = user.reg_ip
    this.role = user.role
    this.remark = user.remark
}

const findOne = (email, s_id, callback) => {
    sql.query('SELECT * FROM user WHERE email = ? or s_id = ? LIMIT 1', [email, s_id], (err, res) => {
        if (err) {
            callback(err, "No user found")
        } else {
            callback(err, res)
        }
    })

}

const getAll = (callback) => {
    sql.query('SELECT * FROM user', (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
            console.log(err)
        }
    })
}
const create = (name,email,sid,password, callback) => {

    sql.query('INSERT INTO user SET sname = ?, email = ?, s_id = ?, password = ?', name, email, sid, password, (err, res) => {
        if (err.errno === 1062) {
            callback(err, "user already exists")
        } else {
            callback(err, res)
        }
    })
}

const createInAdmin = (name,email,sid, role,password, callback) => {

    sql.query('INSERT INTO user SET sname = ?, email = ?, s_id = ?, role = ?, password = ?', [name, email, sid, role, password], (err, res) => {
        if (err.errno === 1062) {
            callback(err, "user already exists")
        } else {
            callback(err, res)
        }
    })
}

const deleteOne = (id, callback) => {
    sql.query('DELETE FROM user WHERE id = ?', id, (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

const banOne = (id, callback) => {
    sql.query('UPDATE user set enable = 1 where id = ?', id, (err, res) => {
      if (err) {
          callback(err, null)
      } else {
          callback(null, res)
      }
    })
}

const unbanOne = (id, callback) => {
    sql.query('UPDATE user set enable = 0 where id = ?', id, (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

const updatePW = (id, password, callback) => {
    sql.query('UPDATE user SET password = ? WHERE id = ?', [password, id], (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

const findByID = (id, callback) => {
    sql.query('SELECT * FROM user WHERE id = ?', id, (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

const updateOne = (id, s_id,  sname, email, password , enable, role, remark, callback) => {
    sql.query('UPDATE user SET sname = ?, email = ?, s_id = ?, password = ?, enable = ?, role = ?, remark = ? WHERE id = ?', [sname, email, s_id, password, enable , role, remark, id], (err, res) => {
        if (err) {
            callback(err, 'User with id ' + id + ' not found')
        } else {
            callback(null, res)
        }
    })
}

const userNum = (callback) => {
    sql.query('SELECT COUNT(*) AS num FROM user', (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

module.exports = {
    findOne,
    getAll,
    create,
    createInAdmin,
    deleteOne,
    updatePW,
    updateOne,
    findByID,
    userNum,
    banOne,
    unbanOne,
};
