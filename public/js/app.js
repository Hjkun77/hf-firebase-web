/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById('quickstart-verify-email').disabled = true
        if (user) {
            // User is signed in.
            var displayName = user.displayName
            var email = user.email
            var emailVerified = user.emailVerified
            var photoURL = user.photoURL
            var isAnonymous = user.isAnonymous
            var uid = user.uid
            var providerData = user.providerData
            document.getElementById('quickstart-sign-in-status').textContent =
                'Signed in'
            document.getElementById('quickstart-sign-in').textContent =
                'Sign out'
            document.getElementById(
                'quickstart-account-details'
            ).textContent = JSON.stringify(user, null, '  ')
            if (!emailVerified) {
                document.getElementById(
                    'quickstart-verify-email'
                ).disabled = false
            }

            document.getElementById('quickstart-sign-in-google-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in-google').textContent = 'Sign out';
            document.getElementById('quickstart-google-account-details').textContent = JSON.stringify(user, null, '  ');
        } else {
            // User is signed out.
            document.getElementById('quickstart-sign-in-status').textContent =
                'Signed out'
            document.getElementById('quickstart-sign-in').textContent =
                'Sign in'
            document.getElementById('quickstart-account-details').textContent =
                'null'
                
                document.getElementById('quickstart-sign-in-google-status').textContent = 'Signed out';
                document.getElementById('quickstart-sign-in-google').textContent = 'Sign in with Google';
                document.getElementById('quickstart-google-account-details').textContent = 'null';
                document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        document.getElementById('quickstart-sign-in').disabled = false
        document.getElementById('quickstart-sign-in-google').disabled = false;
    })
    // [END authstatelistener]

    document
        .getElementById('quickstart-sign-in')
        .addEventListener('click', toggleSignIn, false)
    document
        .getElementById('quickstart-sign-up')
        .addEventListener('click', handleSignUp, false)
    document
        .getElementById('quickstart-verify-email')
        .addEventListener('click', sendEmailVerification, false)
    document
        .getElementById('quickstart-password-reset')
        .addEventListener('click', sendPasswordReset, false)
        
    document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleSignIn, false);
}

window.onload = function () {
    initApp()
}