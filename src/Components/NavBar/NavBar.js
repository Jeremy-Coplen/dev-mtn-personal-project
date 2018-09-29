import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "./NavBar.css"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            backgroundImage: ""
        }
    }

    render() {
        const { user } = this.props
        return (
            <div>
                {
                    this.props.location.pathname === "/"
                    ?
                        null
                    :
                        <div>
                            <img src="" alt="logo"/>
                            <Link to="/dashboard"><button>Dashboard</button></Link>
                            <Link to="/boards"><button>Boards</button></Link>
                            <Link to="/teams"><button>Teams</button></Link>
                            <img className="profile_image" src={user.profile_image} alt="profile"/>
                            <h3>{user.username}</h3>
                            <button>Change Background</button>
                            <a href="http://localhost:3000/logout"><button>Logout</button></a>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const actionOutputs = {
    getUserData: getUserData
}

const connected = connect(mapStateToProps, actionOutputs)

export default withRouter(connected(NavBar))