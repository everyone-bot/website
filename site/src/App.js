import React, { Component } from 'react'

import './app.css'

class App extends Component {
    numbers = '1234567890,.'

    colors = [
        'aqua',
        'cadetblue',
        'coral',
        'crimson',
        'azure',
        'darkviolet',
        'rebeccapurple',
        'gold',
        'palegreen',
    ]

    state = {
        isReady: false,
        displayStatistics: {
            mentions: '',
            users: '',
            groups: '',
            largestGroup: '',
        },
        statisticAnimationFrame: {
            mentions: -1,
            users: -1,
            groups: -1,
            largestGroup: -1,
        },
    }

    componentWillReceiveProps({ data }) {
        const { data: oldData } = this.props
        if (!oldData && data) this.setState({ isReady: true })
    }

    computeStatistic(sampleWidth, statistic) {
        const { isReady, statisticAnimationFrame } = this.state
        const { data } = this.props

        if (!isReady) {
            const string = this.generateString(sampleWidth)

            setTimeout(() => this.computeStatistic(sampleWidth, statistic), 100)

            this.setState(state => ({
                displayStatistics: {
                    ...state.displayStatistics,
                    [statistic]: string,
                },
            }))

            return
        }

        const actualStatistic = data[statistic].toLocaleString()
        const randomString = this.generateString(actualStatistic.length)
        const currentFrame = statisticAnimationFrame[statistic]
        const displayValue = randomString
            .split('')
            .map(
                (item, idx) =>
                    idx < currentFrame ? actualStatistic.charAt(idx) : item,
            )
            .join('')

        if (currentFrame < actualStatistic.length) {
            setTimeout(() => this.computeStatistic(sampleWidth, statistic), 100)
        }

        this.setState(state => ({
            displayStatistics: {
                ...state.displayStatistics,
                [statistic]: displayValue,
            },
            statisticAnimationFrame: {
                ...state.statisticAnimationFrame,
                [statistic]: currentFrame + 1,
            },
        }))
    }

    renderStatistic(statistic) {
        const { displayStatistics, statisticAnimationFrame } = this.state
        if (!displayStatistics[statistic]) return null

        const renderValue = displayStatistics[statistic].split('')
        const currentFrame = statisticAnimationFrame[statistic]

        return (
            <span>
                {renderValue.map((letter, idx) => {
                    const color =
                        idx > currentFrame
                            ? this.generateRandomColor()
                            : 'white'

                    return (
                        <span key={idx} style={{ color }}>
                            {letter}
                        </span>
                    )
                })}
            </span>
        )
    }

    generateString(length) {
        const numArray = this.numbers.split('')
        return new Array(length)
            .fill(undefined)
            .map(
                item =>
                    numArray[Math.floor(Math.random() * this.numbers.length)],
            )
            .join('')
    }

    generateRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }

    componentDidMount() {
        this.computeStatistic(10, 'mentions')
        this.computeStatistic(5, 'users')
        this.computeStatistic(5, 'groups')
        this.computeStatistic(3, 'largestGroup')
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
                    {this.renderStatistic('mentions')} mentions sent |{' '}
                    {this.renderStatistic('users')} users |{' '}
                    {this.renderStatistic('groups')} groups |{' '}
                    {this.renderStatistic('largestGroup')} users in the largest
                    group
                </p>
            </div>
        )
    }
}

export default App

// Telegram bot that makes it easy to mention everyone in a group
