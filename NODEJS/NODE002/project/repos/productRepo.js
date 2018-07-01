var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'SELECT * FROM `product`';
    return db.load(sql);
}

//lay top 10 sp co ngay nhap gan day nhat
exports.loadAllTopDate = () => {
    var sql = 'SELECT * FROM qlbh.product order by ProDateIn desc limit 12;';
    return db.load(sql);
}

//lay top 10 sp xem nhieu nhat
exports.loadAllTopWatch = () => {
    var sql = 'SELECT * FROM qlbh.product order by NumWatch desc limit 12;';
    return db.load(sql);
}

//lay top 10 sp co SL ban nhieu nhat
exports.loadAllTopSale = () => {
    var sql = 'SELECT * FROM qlbh.product order by NumSale desc limit 12;';
    return db.load(sql);
}

//lay top 6 sp cùng nsx
exports.loadAllnsx = (nsxID, num, offset) => {
    var sql = "SELECT * FROM qlbh.product where nsxID = '"+ nsxID+"' limit "+num+" offset "+offset+";";
    return db.load(sql);
}

//lay top 6 sp co cung loai sp
exports.loadAllcate = (CatID, num, offset) => {
    var sql = "SELECT * FROM qlbh.product where CatID = '"+ CatID+"' limit "+num+" offset "+offset+";";
    return db.load(sql);
}

//dem so luong sp theo loai
exports.countByCat = catId => {
	var sql = `select count(*) as total from product where CatID = ${catId}`;
    return db.load(sql);
}

//dem so luong san pham theo nsx
exports.countByNsx = nsxID => {
	var sql = `select count(*) as total from product where nsxID = ${nsxID}`;
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `product` WHERE `product`.`ProID` = "+ id +"";
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

//`CPU`='Intel Core i5-8250U 1.6GHz up to 3.4GHz 6MB', `RAM`='4GB DDR4 2400MHz (Onboard)', `Weight`='1.45kg', `HardDisk`='256GB SSD M.2' WHERE `ProID`='1'
exports.add = (ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap, cpu, ram, weight, hardDisk, stock) => {
    //var sql = "INSERT INTO `product` (`ProID`, `ProName`) VALUES (NULL, '"+ ten +"')";
    var sql = "INSERT INTO `product` (`ProID`, `ProName`, `ProDec`, `CatID`, `nsxID`, `ProPrice`, `ProAddr`, `ProDateIn`, `NumSale`, `NumWatch`, `CPU`, `RAM`, `Weight`, `HardDisk`, `NumStock`) VALUES (NULL, '"+ten+"', '"+mota+"', '"+CatID+"', '"+nsxID+"', '"+gia+"', '"+xuatxu+"', '"+ngayNhap+"', '0', '0','"+cpu+"','"+ram+"','"+weight+"','"+hardDisk+"','"+stock+"');"
    return db.save(sql);
}

exports.delete = (id) => {
    //var sql = `delete from categories where CatId = ${id}`;
    var sql = "DELETE FROM `product` WHERE `ProID` = "+ id +"";
   

    return db.save(sql);
}

exports.update = (ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap, NumSale, NumWatch, cpu, ram, weight, hardDisk, stock, id) => {
    var sql = "UPDATE `product` SET `ProName`='"+ten+"', `ProDec`='"+mota+"', `CatID`='"+CatID
    +"', `nsxID`='"+nsxID+"', `ProPrice`='"+gia+"', `ProAddr`='"+xuatxu
    +"', `ProDateIn`='"+ngayNhap+"', `NumSale`='"+NumSale+"', `NumWatch`='"+NumWatch+"', `CPU`='"+cpu+"', `RAM`='"+ram+"', `Weight`='"+weight+"', `HardDisk`='"+hardDisk+"', `NumStock`='"+stock+"' WHERE `ProID`='"+
    id+"'";

    return db.save(sql);
}

exports.updatethanhtoan = (NumSale, stock, id) => {
    var sql = "UPDATE `product` SET  `NumSale`='"+NumSale+"', `NumStock`='"+stock+"' WHERE `ProID`='"+id+"'";

    return db.save(sql);
}