document.querySelector('button').addEventListener('click', e => {
    e.preventDefault()

	const url = 'https://naurok-test-production.up.railway.app/'
    const testName = document.querySelector('#name').value
    const amountQuestions = document.querySelector('#amount').value
    const subject = document.querySelector('#subject').value
    const klass = document.querySelector('#klas').value
	const data = {
		name: testName,
		amount: amountQuestions,
		subject: subject,
		klass: klass
	}
	getResponse(url, data)
})

function displayResponseData(data) {
	const main = document.querySelector('main')
	document.querySelector('form').remove()
	const tag = document.querySelector('main')

	for (let name in data) {
		let div = document.createElement('div')
		div.innerHTML = `<div class="name">${name}</div> <div class="response">${data[name]}</div>`
		tag.appendChild(div)
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
