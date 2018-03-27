import React, { Component } from 'react'

class App extends Component {
    render() {
        return <div>{JSON.stringify(this.props.data)}</div>
    }
}

export default App
