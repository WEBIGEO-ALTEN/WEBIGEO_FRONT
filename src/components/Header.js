import { useNavigate } from "react-router-dom";
import '../style/style.css'

function Header() {
    var navigator = useNavigate()

    const handleClick = () => {
        let path = '../home'
        navigator(path);
    }

    return (
        <div className="header">
            <div className="home d-flex justify-content-center border-bottom border-white" onClick={handleClick}><h1>HOME</h1></div>
        </div>
    )
}

export default Header