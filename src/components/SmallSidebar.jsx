import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../feature/user/userSlice';
import links from '../utils/links';

const SmallSidebar = () => {
    const { isSideBarOpen } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const toggle = () => {
        dispatch(toggleSidebar())
    }
    return (
        <Wrapper>
            <div className={isSideBarOpen? "show-sidebar sidebar-container" : " sidebar-container"}>
                <div className="content">
                    <button className="close-btn" onClick={toggle}>
                        <FaTimes/>
                    </button>
                    <header>
                    <img src={logo} alt='jobster logo' className='logo' />
                    </header>
                    <div className="nav-links">
                        {links.map((link) => {
                            const {text, path, id, icon} = link;
                            return <NavLink to={path} className={({isActive}) => {
                                return isActive ? 'nav-link active' : 'nav-link'
                            }}
                            key={id}
                            onClick={toggle}>
                                <span className='icon'>{icon}</span>
                                {text}
                            </NavLink>
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export default SmallSidebar;