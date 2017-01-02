export function noteBodyPath(userId, noteId) {
  return 'users/user-' + userId + '/notes/' + noteId + '/body';
}

export function notePath(userId, noteId) {
  return 'users/user-' + userId + '/notes/' + noteId;
}
