const formChecking = document.querySelector('.description')
const submitBtn = document.querySelector('.share')
const disclaimer = document.querySelector('.disclaimer')
const headerDiv = document.querySelector('.headerDiv')
const preview = document.createElement('div')
let imagesArray = {}
preview.classList.add('preview')
const data = {}


submitBtn.addEventListener('click', (e)=>sendInfo(e))

async function sendInfo(e) {
	
	const PushInfo = await request('/api/images', 'POST', data)
	// const answer = await sendFile('/api/upload', files)
	//console.log('send: ', PushInfo)	
}


formChecking.addEventListener('blur', funcValidation)

function funcValidation(){
	console.log(formChecking.value)
	if (formChecking.value == ''){
		disclaimer.style.visibility = 'visible'
		formChecking.style.border = '1px solid red';
		formChecking.style.borderRadius = '4px';
		formChecking.style.boxShadow = '1px 1px 10px rgba(255,0,0, 0.2)';
	} else {
		disclaimer.style.visibility = ''
		formChecking.style.border = '';
		formChecking.style.borderRadius = '';
		formChecking.style.boxShadow = '';
		data.imgDescriprtion = formChecking.value
	}
}

async function Upload() {
	const fileOpenBtn = document.getElementById('selectFileButton')
	fileOpenBtn.setAttribute('multiple', true);
	fileOpenBtn.addEventListener('change', fileUpload)


	async function fileUpload(event) {
		const files = Array.from(event.target.files)
		headerDiv.insertAdjacentElement('afterend', preview)
		const dragPicsDiv = document.querySelector('.dragPics')
		console.log(event.target.files)
		data.imgName = files[0].name
		data.imgSize = files[0].size
		dragPicsDiv.style.display = 'none'

		if (files.length > 1) {
			preview.insertAdjacentHTML("afterend", `
			<div class=flipping>
			<button class='back'>Назад</button>
			<button class='next'>Вперед</button>
			</div>`)
		}

	 	files.forEach(file => {
			if (!file.type.match('image')) {
				return
			}

			const reader = new FileReader()

			reader.onload = event => {

				const src = event.target.result

				preview.insertAdjacentHTML('afterbegin', `
				
					<img src="${src}" alt="${file.name}" class="formImg">
				`)

				const images = document.querySelectorAll('.formImg')
				imagesArray = images
				// console.log(imagesArray)
				if (files.length < 2){
					images[0].style.display = 'block'
				}	 
				
				
			}
			preview.style.backgroundColor = 'rgb(0,0,0, .9)'
			reader.readAsDataURL(file)
		})
	 
	}
}


async function request(url , method='GET', data=null) {
	try {
		const headers={};
		let body;
		
		if (data){
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(data);
		}
		console.log('req:', body);
		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response;
	} catch(e) {
		console.warn(`Erorr: ${e.message}`);
	}
}

Upload()
