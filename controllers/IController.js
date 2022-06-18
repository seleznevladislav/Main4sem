import ItemService from '../services/ItemService.js' 

const addItem = async (req, res, next) => {
	const item = {
		name: req.body.filename,
		description: req.body.imgDescription,
		path: req.files[0]?.path ?? req.file.path	
	}
	try {
		const data = await ItemService.addItem(item)
		res.send(data)
	} catch (error) {
		console.warn(error)
	}
}

export default {
	addItem
}