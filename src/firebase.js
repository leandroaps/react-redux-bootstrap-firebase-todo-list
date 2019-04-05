import * as firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyAz5CR5qeFnz59LW7oYtQ0PZUXz-0GQwT4',
  authDomain: 'react-todo-list-c7e8f.firebaseapp.com',
  databaseURL: 'https://react-todo-list-c7e8f.firebaseio.com',
  projectId: 'react-todo-list-c7e8f',
  storageBucket: 'react-todo-list-c7e8f.appspot.com',
  messagingSenderId: '973833236849'
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child('react-todo-list');
