import { Link } from "react-router-dom";
import icon from "../assets/favicon.ico";

const Landing = () => {
    return (
        <main>
            <nav>
                <img src={icon} alt="jobster logo" className="logo" />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>Job <span>Tracking</span> App</h1>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptas corrupti hic, qui earum saepe repellat eum fugiat ea eveniet commodi nihil? Nesciunt pariatur aut voluptatum, ipsam sapiente iure dolores?</p>
                <Link to='/login' className="btn btn-primary"> Login/Register </Link>
                
            </div>
        </main>

    )
}

export default Landing;