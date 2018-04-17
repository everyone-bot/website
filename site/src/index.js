import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import FirebaseProvider from './FirebaseProvider'
import App from './App'

import './index.css'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDVGTlr_8U17iGWadjqjK41qyOYI_tZAa4',
    authDomain: 'everyonebot-c4d1b.firebaseapp.com',
    databaseURL: 'https://everyonebot-c4d1b.firebaseio.com',
    projectId: 'everyonebot-c4d1b',
})

const ConnectedApp = FirebaseProvider(App, firebaseApp, '/statistics')

ReactDOM.render(<ConnectedApp />, document.getElementById('root'))
