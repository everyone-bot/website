import React, { Component } from 'react'
import Logo from './logo.png'

import './app.css'

class App extends Component {
    state = {
        isReady: false,
    }

    componentWillReceiveProps({ data }) {
        const { data: oldData } = this.props
        if (!oldData && data) this.setState({ isReady: true })
    }

    renderBody() {
        const { data } = this.props

        return (
            <div className="app__body">
                <h1 className="app__heading">Everyone Bot</h1>

                <a
                    role="button"
                    className="app__button"
                    href="https://www.google.com"
                >
                    Add to your group
                </a>

                <div className="app__mentions">
                    {data.mentions.toLocaleString()}
                </div>

                <div className="app__stats">
                    <div className="app__stat">
                        {data.groups.toLocaleString()} groups
                    </div>

                    <div className="app__stat">
                        {data.users.toLocaleString()} users
                    </div>

                    <div className="app__stat">
                        {data.largestGroup.toLocaleString()} largest group
                    </div>
                </div>
            </div>
        )
    }

    renderFooter() {
        return (
            <footer className="app__footer">
                Made with love by Aquib Master
            </footer>
        )
    }

    render() {
        const { isReady } = this.state
        const logoClasses = [
            'app__logo',
            !isReady && 'app__logo--loading',
        ].join(' ')

        return (
            <div className="app">
                <div className={logoClasses}>
                    <img alt="Everyone bot logo" src={Logo} title="logo" />
                </div>

                {isReady && [this.renderBody(), this.renderFooter()]}
            </div>
        )
    }
}

export default App
