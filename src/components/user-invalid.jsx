import { Link } from "react-router-dom";

export function UserInvalid(){
    return(
        <div>
            <h2 className="bg-danger">Invalid Credentials</h2>
            <Link to="/login">Try Again!!!!!!!</Link>
        </div>
    )
}