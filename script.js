document.body.addEventListener('click', clickHandler);

function clickHandler(event) {
	event.preventDefault();

	if (!event.target.hasAttribute('data-editable')) return;

	let targetElement = event.target;
	let parentElement = targetElement.parentNode;
	let type = targetElement.getAttribute('data-editable');

	let inputElement = document.createElement('input');
	inputElement.setAttribute('type', type);
	parentElement.appendChild(inputElement);
	inputElement.value = targetElement.innerText;

	parentElement.removeChild(targetElement);

	inputElement.select();

	inputElement.addEventListener('blur', function(event) {
		parentElement.appendChild(targetElement);
		parentElement.removeChild(inputElement);
	});

	inputElement.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 13: 
				inputElement.blur();
				targetElement.innerText = inputElement.value;
			break;

			case 27:
				inputElement.blur();
			break;
		}
	});
}