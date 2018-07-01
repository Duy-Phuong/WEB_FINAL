var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM `productcate`';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
       // var sql = `select * from categories where CatId = ${id}`;
       var sql = "SELECT * FROM `productcate` WHERE `productcate`.`CatID` = "+ id +"";
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
    //var sql = `insert into categories(catname) values('${c.CatName}')`;
    var sql = "INSERT INTO `productcate` (`CatID`, `CatName`) VALUES (NULL, '"+ ten +"')";
    return db.save(sql);
}

exports.delete = (id) => {
    //var sql = `delete from categories where CatId = ${id}`;
    var sql = "DELETE FROM `productcate` WHERE `productcate`.`CatID` = "+ id +"";
    return db.save(sql);
}

exports.update = (name, id) => {
   // var sql = `update categories set CatName = '${c.CatName}' where CatID = ${c.CatId}`;
   var sql = "UPDATE `productcate` SET `CatName` = '" + name + "' WHERE `productcate`.`CatID` = "+ id +"";
    return db.save(sql);
}
