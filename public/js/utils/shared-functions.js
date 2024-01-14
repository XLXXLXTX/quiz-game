/**
 * Function to redirect to a page
 */
function redirect(page) {
	window.location.href = page;
}

/**
 * Function to get the value of a cookie
 */
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Function to populate a select element with data
 * data must be an array of objects with the following structure:
 * [
 * {
 *     value: 'value',
 *    name: 'name'
 * },
 * ...
 * ]
 */
function populateSelect(elementId, data) {

	//console.log('populateSelect:', elementId, data);

	const selectElement = document.getElementById(elementId);

	// clear the select element
	selectElement.innerHTML = '';

	// add the options to the select element
	for (const category of data) {
		const option = document.createElement('option');
		option.value = category.value;
		option.text = category.name;
		selectElement.appendChild(option);
	}
}

/**
 * Function to retrieve the categories from the DB
 */
async function getCategories() {
	const response = await axios.get('/questions/categories');

	//console.log('response:', response);

	if (!response.data) {
		alert('Error: /questions/categories');
		throw new Error('Error: /questions/categories');
	}

	const categories = response.data
	console.log('getCategories -> categories:', categories);
	return categories;
}