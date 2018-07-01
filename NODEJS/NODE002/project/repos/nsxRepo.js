var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM `nsx`';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `nsx` WHERE `nsx`.`nsxID` = "+ id +"";
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

exports.add = (ten) => {
    var sql = "INSERT INTO `nsx` (`nsxID`, `nsxName`) VALUES (NULL, '"+ ten +"')";
    return db.save(sql);
}

exports.delete = (id) => {
    //var sql = `delete from categories where CatId = ${id}`;
    var sql = "DELETE FROM `nsx` WHERE `nsx`.`nsxID` = "+ id +"";
    return db.save(sql);
}

exports.update = (name, id) => {
    var sql = "UPDATE `nsx` SET `nsxName` = '" + name + "' WHERE `nsx`.`nsxID` = "+ id +"";
    return db.save(sql);
}
