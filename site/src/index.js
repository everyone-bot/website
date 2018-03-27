import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import FirebaseProvider from './FirebaseProvider'
import App from './App'

import './index.css'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCLaXg1NbSEPoHNP1YXvYITTQF6EmwWe8Y',
    authDomain: 'everyonebotdev.firebaseapp.com',
    databaseURL: 'https://everyonebotdev.firebaseio.com',
    projectId: 'everyonebotdev',
})

const ConnectedApp = FirebaseProvider(App, firebaseApp, '/statistics')

ReactDOM.render(<ConnectedApp />, document.getElementById('root'))
