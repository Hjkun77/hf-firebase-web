/**
			 * Handles the sign in button press.
			 */
			function toggleSignIn() {
				if (firebase.auth().currentUser) {
					firebase.auth().signOut()
				} else {
					var email = document.getElementById('email').value
					var password = document.getElementById('password').value
					if (email.length < 4) {
						alert('Please enter an email address.')
						return
					}
					if (password.length < 4) {
						alert('Please enter a password.')
						return
					}
					// Sign in with email and pass.
					firebase
						.auth()
						.signInWithEmailAndPassword(email, password)
						.catch(function (error) {
							// Handle Errors here.
							var errorCode = error.code
							var errorMessage = error.message
							if (errorCode === 'auth/wrong-password') {
								alert('Wrong password.')
							} else {
								alert(errorMessage)
							}
							console.log(error)
							document.getElementById('quickstart-sign-in').disabled = false
						})
				}
				document.getElementById('quickstart-sign-in').disabled = true
			}

			/**
			 * Handles the sign up button press.
			 */
			function handleSignUp() {
				var email = document.getElementById('email').value
				var password = document.getElementById('password').value
				if (email.length < 4) {
					alert('Please enter an email address.')
					return
				}
				if (password.length < 4) {
					alert('Please enter a password.')
					return
				}
				// Create user with email and pass.
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => alert('User has been created!'))
					.catch(function (error) {
						// Handle Errors here.
						var errorCode = error.code
						var errorMessage = error.message
						if (errorCode == 'auth/weak-password') {
							alert('The password is too weak.')
						} else {
							alert(errorMessage)
						}
						console.log(error)
					})
			}

			/**
			 * Sends an email verification to the user.
			 */
			function sendEmailVerification() {
				firebase
					.auth()
					.currentUser.sendEmailVerification()
					.then(function () {
						// Email Verification sent!
						alert('Email Verification Sent!')
					})
			}

			function sendPasswordReset() {
				var email = document.getElementById('email').value
				firebase
					.auth()
					.sendPasswordResetEmail(email)
					.then(function () {
						// Password Reset Email Sent!
						alert('Password Reset Email Sent!')
					})
					.catch(function (error) {
						// Handle Errors here.
						var errorCode = error.code
						var errorMessage = error.message
						if (errorCode == 'auth/invalid-email') {
							alert(errorMessage)
						} else if (errorCode == 'auth/user-not-found') {
							alert(errorMessage)
						}
						console.log(error)
					})
			}
