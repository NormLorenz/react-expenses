import { ref, firebaseAuth } from '../config/constants';

export function auth(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

// javascript object
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
    logout(callback) {
    this.isAuthenticated = false
    setTimeout(callback, 100)
  }
}