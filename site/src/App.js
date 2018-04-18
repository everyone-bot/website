import React, { Component } from 'react'
import octicons from 'octicons'
import StatsDisplay from './components/StatsDisplay'

import './app.css'

class App extends Component {
    renderStatistic(statistic, sampleWidth, text, isLast) {
        const { data } = this.props
        const value = data && data[statistic]

        return (
            <span className="app__statistic">
                <StatsDisplay
                    sampleWidth={sampleWidth}
                    hasData={!!data}
                    statisticValue={value}
                />

                <span> {text}</span>

                {!isLast && <span className="app__bullet">&#9679;</span>}
            </span>
        )
    }

    renderOcticon(name) {
        const octicon = octicons[name] && octicons[name].toSVG()
        const iconSvg = { __html: octicon }

        return (
            <span
                className="app__button-icon"
                dangerouslySetInnerHTML={iconSvg}
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
                    {this.renderStatistic('mentions', 10, 'mentions sent')}
                    {this.renderStatistic('users', 5, 'users')}
                    {this.renderStatistic('groups', 5, 'groups')}
                    {this.renderStatistic(
                        'largestGroup',
                        3,
                        'users in the largest group',
                        true,
                    )}
                </p>

                <div className="app__button-group">
                    <a
                        className="app__button app__button--primary"
                        href="https://telegram.me/everyonethebot"
                    >
                        {this.renderOcticon('plus')} Add to Telegram
                    </a>

                    <a
                        className="app__button"
                        href="https://github.com/everyone-bot/everyone-bot"
                    >
                        {this.renderOcticon('mark-github')} View on GitHub
                    </a>
                </div>
            </div>
        )
    }
}

export default App
