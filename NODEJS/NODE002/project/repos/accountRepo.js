var db = require('../fn/db');

exports.add = user => {
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission, f_sdt) values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permission}, '${user.sdt}')`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from users where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}