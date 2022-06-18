import supabase from '../configs/db.config.js'

const addItem = async item => {
	try {
			const {data, error} = await supabase
					.from('Item')
					.insert(item)

			if (error) throw error
			return data
	} catch (e) {
			console.warn(e) 
	}
}

export default {
	addItem
}