import { Navigate } from "react-router-dom"
import Layout from "../../pages/Layout/Layout"
import AuthForm from "../AuthForm/AuthForm"

function Account() {
    const meQuery = "error" 

    switch(meQuery) { //.status
        // case "pending":
        //     return <Loader />
        case "error":
            return <Navigate to={'/auth'} replace />
        // case "success":
        //     return <Navigate to={'/'} />
    }
}

export default Account