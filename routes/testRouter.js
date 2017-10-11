const express = require('express');
const app = express();
const testRouter = express.Router();

const Item = require('../client/src/models/item');

testRouter.route('/add/post').post(function(req, res) {
    const item = new Item(req.body);
        item.save()

        .then(item => {
            res.json('Item added');
        })

        .catch(err => {
            res.status(400).send('Unable to save to db');
        });
});

testRouter.route('/').get(function(req, res) {
    Item.find(function(err, itms) {
        if(err) {
            console.log(err);
        } else {
            res.json(itms);
        }
    });
});

testRouter.route('/edit/:id').get(function(req, res) {
    const id = req.params.id;

    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

testRouter.route('/update/:id').post(function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (!item) {
            return next(new Error('Could not load doc'));
        } else {
            item.item = req.body.item;

            item.save().then(item => {
                res.json('Update complete');
            })

            .catch(err => {
                res.status(400).send('Unable to update db');
            });
        }
    });
});

testRouter.route('/delete/:id').get(function(req, res) {
    Item.findByIdAndRemove({ _id: req.params.id },
        function(err, item) {
            if (err) {
                res.json(err);
            } else {
                res.json('Item removed');
            }
        });
});

module.exports = testRouter;