var categoryRepo = require('../repos/productcateRepo');

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

    categoryRepo.loadAll().then(rows => {
        res.locals.layoutVM = {
            categories: rows,
            suppliers: rows,
            isLogged: req.session.isLogged,
            curUser: req.session.user
        };
       // console.log(" =================== res.locals.layoutVM.curUser ============================");

        // console.log(res.locals.layoutVM.curUser);

        next();
    });
};