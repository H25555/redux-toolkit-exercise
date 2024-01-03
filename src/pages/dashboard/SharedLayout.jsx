import { Outlet } from "react-router-dom";
import BigSidebar from "../../components/BigSidebar";
import SmallSidebar from "../../components/SmallSidebar";
import Navbar from "../../components/Navbar";
import Wrapper from '../../assets/wrappers/SharedLayout'
const SharedLayout = () => {
    return(
        <Wrapper>
            <main className="dashboard">
                <BigSidebar/>
                <SmallSidebar/>
                <div>
                    <Navbar/>
                    <div className="dashboard-page">
                        <Outlet/>
                    </div>
                </div>

            </main>
        </Wrapper>
    )
}
export default SharedLayout;