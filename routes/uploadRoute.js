const { Router } = require('express');
const file = require('../middlewares/file');
const fileMiddleware = require('../middlewares/file')

const router = Router();

router.post('/upload', fileMiddleware.single('avatar'), (req, res) => {
	try {
		if (req.file) {
			res.json(req.file)
		}
		
	} catch (error) {
		console.log(error)
	}
})

module.exports = router