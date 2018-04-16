import React, { Component } from 'react'
import StatsDisplay from './components/StatsDisplay'

import './app.css'

class App extends Component {
    renderStatistic(statistic, sampleWidth) {
        const { data } = this.props
        const value = data && data[statistic]

        return (
            <StatsDisplay
                sampleWidth={sampleWidth}
                hasData={!!data}
                statisticValue={value}
            />
        )
    }

    render() {
        return (
            <div className="app">
                <h1>@everyone_bot</h1>

                <p>
                    Telegram bot that makes it easy to mention{' '}
                    <span className="app__highlight">@everyone</span> in a group
                </p>

                <p>
                    {this.renderStatistic('mentions', 10)} mentions sent |{' '}
                    {this.renderStatistic('users', 5)} users |{' '}
                    {this.renderStatistic('groups', 5)} groups |{' '}
                    {this.renderStatistic('largestGroup', 3)} users in the
                    largest group
                </p>
            </div>
        )
    }
}

export default App
