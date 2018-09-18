import React from "react"
import { withRouter } from "react-router-dom"

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
                        <h1>NavBar</h1>
                    </div>
            }
        </div>
    )
}

export default withRouter(NavBar)