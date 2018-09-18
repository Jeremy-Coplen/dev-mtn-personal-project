import React from "react"
import { Link, withRouter } from "react-router-dom"

function NavBar(props) {
    console.log(props)
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
                    </div>
            }
        </div>
    )
}

export default withRouter(NavBar)