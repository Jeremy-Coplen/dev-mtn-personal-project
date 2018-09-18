import React from "react"
import { Link, withRouter } from "react-router-dom"
import "./NavBar.css"

import { connect } from "react-redux"

function NavBar(props) {
    const { username, profile_image } = props
    return (
        <div>
            {
                props.location.pathname === "/"
                ?
                    null
                :
                    <div>
                        <img src="" alt="logo"/>
                        <Link to="/dashboard"><button>Dashboard</button></Link>
                        <Link to="/boards"><button>Boards</button></Link>
                        <Link to="/teams"><button>Teams</button></Link>
                        <Link to="/account"><img className="profile_image" src={profile_image} alt="profile"/></Link>
                        <h3>{username}</h3>
                    </div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        username: state.user.username,
        profile_image: state.user.profile_image,
    }
}

export default withRouter(connect(mapStateToProps)(NavBar))