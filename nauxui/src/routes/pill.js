const express = require('express');
const router = express.Router();

const pillController = require('../app/controllers/PillContronller');

router.post('/store', pillController.store);
router.get('/create', pillController.create);
router.get('/view', pillController.indexView);
router.get('/boxkey/:slug', pillController.boxKey);
router.delete('/:id', pillController.destroy);
router.get('/edit/:id', pillController.edit);
router.put('/:id', pillController.update);

router.get('/count', pillController.count);
router.get('/', pillController.index);

module.exports = router;
