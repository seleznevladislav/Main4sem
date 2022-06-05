const express = require('express');
const path = require('path');
const app = express();
const date = new Date();
const PORT = process.env.PORT || 3000;
let INFORMATION = []

app.use('/api', require('./routes/uploadRoute'))
app.use(express.static(path.resolve(__dirname, 'client')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.json( { extended: true }));

app.get('/api/images', (req,res)=>{
	res.status(200).json(INFORMATION);
})

app.post('/api/images', (req, res)=>{
	INFORMATION.push(req.body)
	res.status(201).json(req.body)
})

app.get('/', (req,res)=>{
	res.sendFile(path.resolve(__dirname, 'client', 'form.html'))
})

app.listen(PORT, ()=>{
	console.log(`Server started at port ${PORT}`);
	console.log(date.getFullYear());
})
