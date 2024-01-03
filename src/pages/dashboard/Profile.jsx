import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { updateUser } from "../../feature/user/userSlice";

const Profile = () => {
    const {isLoading, user} = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || '',

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, lastName, location} = userData;
        if(!name || !email || !lastName || !location){
            toast.error("Vui lòng nhập đủ trường!")
            return
        }
        dispatch(updateUser(userData))
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]: value})
    }
    return(
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <ToastContainer/>
                <h3>profile</h3>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="name" className="form-label">
                            name:
                        </label>
                        <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email" className="form-label">
                            email:
                        </label>
                        <input type="text" id="email" name="email" value={userData.email} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="lastname" className="form-label">
                            last Name:
                        </label>
                        <input type="text" id="lastname" name="lastname" value={userData.lastName} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="name" className="form-label">
                            location:
                        </label>
                        <input type="text" id="location" name="location" value={userData.location} onChange={handleChange} className="form-input" />
                    </div>
                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading? 'Please wait...' : 'Save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
export default Profile;