const express = require('express');
const router = express.Router();

const boxController = require('../app/controllers/BoxController');

router.get('/view', boxController.indexView);
router.put('/:id', boxController.update);
router.post('/store', boxController.store);
router.get('/edit/:id', boxController.edit);
router.get('/create', boxController.create);
router.get('/active/:active', boxController.active);
router.get('/count', boxController.count);
router.get('/', boxController.index);

module.exports = router;
