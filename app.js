const express = require('express');
const path = require('path');
const app = express();
const date = new Date();
const PORT = process.env.PORT || 3000;
let INFORMATION = {}


let fileContent = fs.readFileSync('./images/images.txt', 'utf8')


app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json());

app.get('/api/images', (req,res)=>{
	res.status(200).json(fileContent);
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
