import React from 'react'

export default (Component, firebaseApp, ref) =>
    class extends React.Component {
        state = {
            data: undefined,
        }

        firebaseRef = firebaseApp.database().ref(ref)

        componentDidMount() {
            this.firebaseRef.on('value', this._handleNewFirebaseData)
        }

        componentWillUnmount() {
            this.firebaseRef.off('value', this._handleNewFirebaseData)
        }

        _handleNewFirebaseData = snapshot => {
            this.setState({ data: snapshot.val() })
        }

        render() {
            return <Component {...this.props} data={this.state.data} />
        }
    }
