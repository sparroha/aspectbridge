import { Link } from "react-router-dom";

export default function SandboxNavbar(props){
    return(
        <div>
            <h1>Navbar</h1>
            <Link to="/sandbox">Home</Link>
            <Link to="/sandbox/cardgame">Card Game</Link>
            <Link to="/sandbox/cardsgame">Cards Game</Link>
            <Link to="/sandbox/provider">Provider</Link>
            <Link to="/sandbox/registrytest">Registry Test</Link>
        </div>
    )
}