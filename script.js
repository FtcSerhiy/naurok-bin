document.querySelector('button').addEventListener('click', e => {
    e.preventDefault()

	const url = 'https://naurok-test-production.up.railway.app/'
    const testName = document.querySelector('#name').value
    const amountQuestions = document.querySelector('#amount').value
    const subject = document.querySelector('#subject').value
    const klass = document.querySelector('#klas').value
	let data = {
		name: testName,
		amount: amountQuestions,
		subject: subject,
		klass: klass
	}
	document.querySelector('form').remove()
	document.querySelector('main').innerHTML = '<span style="color:grey">Click \'/\' for open search</span>'
	
	data = displayResponseData(getResponse(url, data))
	document.addEventListener('keydown', e => {
		if (e.code === 'Slash') {
			const popup = document.querySelector('.popup')
			popup.classList.add('open')
			document.addEventListener('keydown', e => {
				if(e.code === 'Escape') {document.querySelector('.popup').classList.remove('open')}
			})
			
			document.querySelector('.popup__content').innerHTML = `
			<form class="find">
				<input type="text" placehodler="Напишіть запитання...">
				<button>/</button>
			</form>
			<hr>`

			document.querySelector('button').addEventListener('click', e => {
				e.preventDefault()
				const key = document.querySelector('input').value

				displayRequest(filterRequests(Object.keys(data), key), data)
			})
		}
	})
})

function displayResponseData(data) {
	for (let name in data) {
		let div = document.createElement('div')
		div.classList.add('block')
		div.innerHTML = `<div class="name">${name}</div> <div class="response">${data[name]}</div>`
		document.querySelector('main').appendChild(div)
	}
}

function getResponse(url, data) {
	fetch(url, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'}, 
  		body: JSON.stringify(data)
	})
		.then(request => request.json().then(response => displayResponseData(response.value)).catch(err => console.log(err)))
		.catch(err => console.log(err))
}

function filterRequests(arr, searchKey) {
	const request = arr.filter(e => e.includes(searchKey))
	console.log(request)
    return request
}

function displayRequest(request, data) {
	const block = document.querySelector('.block')
	if(block) {
		block.remove()
		console.log(block)
	}
	const element = document.createElement('div')
	element.classList.add('block')
	request.forEach(e => {
		element.innerHTML = `<div class="name">${e}</div> <div class="response">${data[e]}</div>`
	})
	document.querySelector('.popup__content').appendChild(element)
}

