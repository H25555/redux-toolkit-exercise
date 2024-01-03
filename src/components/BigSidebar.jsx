import Wrapper from '../assets/wrappers/BigSidebar'
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import logo from '../assets/images/logo.svg'
import { toggleSidebar } from '../feature/user/userSlice';
import { useSelector } from 'react-redux';
const BigSidebar = () => {
    const { isSideBarOpen } = useSelector((store) => store.user);

    return (
        <Wrapper>
            <div className={isSideBarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <img src={logo} alt='jobster logo' className='logo' />
                    </header>
                </div>
                <div className="nav-links">
                    {links.map((link) => {
                        const { text, path, id, icon } = link;
                        return <NavLink to={path} className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                            key={id}
                            onClick={()=>toggleSidebar()}>
                            <span className='icon'>{icon}</span>
                            {text}
                        </NavLink>
                    })}
                </div>
            </div>
        </Wrapper>
    )
}
export default BigSidebar;