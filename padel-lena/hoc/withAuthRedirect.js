import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (Component) => {
    return class extends React.Component {
        render() {
            if (typeof window !== 'undefined' && window.localStorage.getItem('token')) {
                return <Redirect to="/myReservations" />
            } else {
                return <Component {...this.props} />
            }
        }
    }
}

export default withAuthRedirect;