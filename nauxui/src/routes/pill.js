const express = require('express');
const router = express.Router();

const pillController = require('../app/controllers/PillContronller');

router.get('/:slug', pillController.boxKey);
router.delete('/:id', pillController.destroy);
router.get('/edit/:id', pillController.edit);
router.put('/:id', pillController.update);
router.post('/store', pillController.store);
router.get('/create', pillController.create);
router.get('/view', pillController.indexView);
router.get('/', pillController.index);

module.exports = router;
