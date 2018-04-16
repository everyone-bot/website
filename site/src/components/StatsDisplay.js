import React, { Component } from 'react'

export default class StatsDisplay extends Component {
    numbers = '1234567890,.'

    state = {
        displayStatistic: '',
        animationFrame: -1,
    }

    _computeStatistic = () => {
        const { sampleWidth, hasData, statisticValue } = this.props
        const { animationFrame } = this.state

        if (!hasData) {
            const displayStatistic = this.generateRandomString(sampleWidth)

            setTimeout(this._computeStatistic, 100)
            this.setState({ displayStatistic })

            return
        }

        const actualStatistic = statisticValue.toLocaleString()
        const randomString = this.generateRandomString(actualStatistic.length)
        const displayStatistic = randomString
            .split('')
            .map(
                (char, idx) =>
                    idx < animationFrame ? actualStatistic.charAt(idx) : char,
            )
            .join('')

        if (animationFrame < actualStatistic.length)
            setTimeout(this._computeStatistic, 100)

        this.setState(state => ({
            displayStatistic,
            animationFrame: state.animationFrame + 1,
        }))
    }

    generateRandomString(length) {
        const numArray = this.numbers.split('')

        return new Array(length)
            .fill(undefined)
            .map(
                item =>
                    numArray[Math.floor(Math.random() * this.numbers.length)],
            )
            .join('')
    }

    componentDidMount() {
        this._computeStatistic()
    }

    render() {
        const { displayStatistic } = this.state
        return <span>{displayStatistic}</span>
    }
}
