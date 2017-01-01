import emptyUserData from './emptyUserData';

// checks to see if user exists. If not, create new entry
export default function validateUser(users_ref, id) {
  users_ref.child('user-' + id).once('value', function(snapshot) {
    if (snapshot.val() === null) {
      setupUserAccount(users_ref, id);
    }
  });
}

function setupUserAccount(ref, id) {
  const userData = Object.assign({}, emptyUserData);
  ref.child('user-' + id).set(userData);
}
