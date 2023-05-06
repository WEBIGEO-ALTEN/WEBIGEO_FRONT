import { useNavigate } from "react-router-dom";

function Header() {
    var navigator = useNavigate()

    const handleClick = () => {
        let path = '../home'
        navigator(path);
    }

    return (
        <div className="header">
            <div className="home" onClick={handleClick}>HOME</div>
        </div>
    )
}

export default Header