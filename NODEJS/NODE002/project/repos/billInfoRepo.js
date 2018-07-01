
var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM billinfo;';
    return db.load(sql);
}



exports.loadAllsdt = (sdt, date) => {
    var sql = "SELECT * FROM billinfo where sdt = '"+ sdt+"' and date ='"+date+"';";
    return db.load(sql);
}

exports.add = (SDT, id, num, date) => {
    
    var sql = "INSERT INTO `qlbh`.`billinfo` (`id`, `sdt`, `ProID`, `num`, `date`) VALUES (NULL, '"+SDT+"', '"+id+"', '"+num+"', '"+date+"');";
    return db.save(sql);
}


exports.single = (sdt, date, ProID) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM billinfo WHERE ProID = "+ ProID +" and date = '"+date+"' and sdt = '"+sdt+"';";
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.single1 = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM billinfo WHERE id = "+ id +"";
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}