var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/BudgetDB';

//GET - Return all user's budgets in the DB 
exports.findAllBudgets = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").find({
                'user_id': req.body.user_id
            })
            .toArray(function (err, result) {
                if (err) res.status(500).send(err.message);
                res.status(200).jsonp(result);
            });
    });
};

//POST - Return a budget by _id in the DB
exports.findBudget = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").find({
                _id: req.body._id
            })
            .toArray(function (err, result) {
                if (err) res.status(500).send(err.message);
                res.status(200).jsonp(result);
            });
    });
};

// POST - save a budget info sent by ajax call
exports.updateBudget = function (req, res) {

    var budget =[{
        '_id': req.body._id,
        'description': req.body.description
    }];

    var query = [{'_id': req.body._id }, { $set: budget }];
    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").update(query[0], query[1], function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
}

// POST - save a budget info sent by ajax call
exports.saveBudget = function (req, res) {

    budget = {
        _id: req.body._id,
        description: req.body.description,
        user_id: req.body.user_id,
        isDefault: false
    };

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").insertOne(budget, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};

// POST - remove a budget info sent by ajax call
exports.removeBudget = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").remove({
            _id: req.body._id
        }, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};

// POST - remove a budget info sent by ajax call
exports.setDefault = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").update({}, { $set: { isDefault: false }
        },{multi:true}, function (err, result) {
            if (err) res.status(500).send(err.message);
        });

        db.collection("Budgets").update({
            _id: req.body._id }, { $set: { isDefault: true }
        }, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};