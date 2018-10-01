import React, { Component } from "react"

class Login extends Component {

    login() {
        const {
            REACT_APP_DOMAIN,
            REACT_APP_CLIENT_ID
        } = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    render() {
        return (
            <div className="login">
                <div className="logo_name">
                    <img id="front_logo" src="https://cdn0.iconfinder.com/data/icons/business-and-finance-vol-2/48/65-512.png" alt="" />
                    <h1>Get On Track</h1>
                </div>
                <div className="login_button" onClick={this.login}>Get Started</div>
            </div>
        )
    }
}

export default Login