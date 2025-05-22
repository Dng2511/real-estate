const express = require('express');
const categoryCtrl = require('../apps/controllers/apis/category');
const productCtrl = require('../apps/controllers/apis/product');
const orderCtrl = require('../apps/controllers/apis/order');
const router = express.Router();

router.get('/categories', categoryCtrl.index);
router.get('/categories/:id', categoryCtrl.searchById);
router.get('/categories/:id/products', categoryCtrl.catProducts);
router.get('/products', productCtrl.index);
router.get('/products/:id', productCtrl.show);
router.get('/products/:id/comments', productCtrl.comment);
router.post('/products/:id/comments', productCtrl.storeComment);
router.post('/orders', orderCtrl.order);

module.exports = router;