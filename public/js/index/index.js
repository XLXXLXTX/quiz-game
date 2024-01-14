/* JS file with functions for the index page */

/**
 * Function to decode the token on the backend and display user info
 * once the user is logged in
 */
async function displayUserInfo() {

	// Get the encoded token from the cookie
	const token = getCookie('token');

	if (token) {
		try {
			// Make a request to the backend to decode the token
			const response = await axios.post('/api/decode-token', { token });

			if (!response.data) {
				alert('Error: Invalid token');
				throw new Error('Invalid token');
			}

			// Display user information in the 'user-info' div
			const userInfoDiv = document.getElementById('user-info');
			userInfoDiv.innerHTML = `Welcome back, <span>${response.data.username}</span> !`;

			const profileBtn = document.querySelector('.profile-btn');
			profileBtn.classList.remove('profile-btn-hide');
			profileBtn.classList.add('profile-btn-show');

		} catch (error) {
			console.error('Error decoding token:', error);
		}
	}
}