
var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM bill order by date desc;';//giam dan ngay lap
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bill` WHERE `bill`.`billID` = "+ id +"";
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


exports.add = (ten, diaChi, SDT, ngayNhap, Status) => {
    
    var sql = "INSERT INTO `bill` (`billID`, `TenKH`, `Addr`, `SDT`, `Date`, `Status`) VALUES (NULL, '"+ten+"', '"+diaChi+"', '"+SDT+"', '"+ngayNhap+"', '"+Status+"');";
    return db.save(sql);
}

exports.delete = (id) => {
    //var sql = `delete from categories where CatId = ${id}`;
    var sql = "DELETE FROM `bill` WHERE `billID` = "+ id +"";
   

    return db.save(sql);
}

exports.update = (ten, diaChi, SDT, ngayNhap, Status, id) => {
    var sql = "UPDATE `qlbh`.`bill` SET `TenKH`='"+ten+"', `Addr`='"+diaChi+"', `SDT`='"+SDT+"', `Date`='"+ngayNhap+"', `Status`='"+Status+"' WHERE `billID`='"+id+"';";

    return db.save(sql);
}
