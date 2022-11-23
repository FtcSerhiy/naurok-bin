document.querySelector('button').addEventListener('click', e => {
    e.preventDefault()

	const url = 'http://localhost:8000/'
    const testName = document.querySelector('#name').value
    const amountQuestions = document.querySelector('#amount').value
    const subject = document.querySelector('#subject').value
    const klass = document.querySelector('#klas').value
	let response;

	fetch(`${url}?name=${testName}&amount=${amountQuestions}&subject=${subject}&klass=${klass}`)
		.then(request => response = request)

	console.log(response)
	document.querySelector('main').innertHTML = response
})
