import icon from "../assets/favicon.ico";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginUser, registerUser, toggleSidebar } from "../feature/user/userSlice";
import { useNavigate } from "react-router-dom";
import { store } from "../store";
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = () => {
    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initState = {
        name: '',
        password: '',
        email: '',
        isMember: true
    }
    const [values, setValues] = useState(initState);
    const submit = (e) => {
        e.preventDefault();
        const { name, password, email, isMember } = values;
        if (isMember) {
            if (!email || !password ) {
                console.log(values);
                toast.error("Vui lòng nhập đủ trường 1");
                return
            }
        } else {
            if (!email || !password || !name ) {
                toast.error("Vui lòng nhập đủ trường 2");
                return
            }
        }
        // if (!name || !password || (!isMember && !email)) {
        //     toast.error("Vui lòng nhập đủ trường");
        //     return
        // }
        if (isMember) {
            dispatch(loginUser({ email: email, password: password }));
            return;
        }
        dispatch(registerUser({ name: name, password: password, email: email }))
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }
    const changeMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    useEffect(() => {
        console.log(user);
        if (user) {
          setTimeout(() => {
            navigate('/');
          }, 2000);
          console.log(user);
        }
      }, [user]);

      
    return (
        <div className="container m-5">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <ToastContainer />
                    <div className="border shadow p-3 mb-5 bg-body-tertiary rounded">
                        <form onSubmit={submit}>
                            <div className="text-center m-3">
                                <div className="form-group m-3 fw-bolder text-primary">
                                    <img src={icon} alt="icon" className="me-2" height="35px" />
                                    <span>{!values.isMember ? 'Register' : 'Login'}</span>
                                </div>
                            </div>
                            {!values.isMember && (<div className="form-group m-3">
                                <label className="fw-semibold" htmlFor="name">Name:</label>
                                <input className="form-control " name="name" onChange={handleChange} value={values.name} type="text" id="name" placeholder="Enter your name" />
                            </div>
                            )}
                            <div className="form-group m-3">
                                <label className="fw-semibold" htmlFor="email">Email:</label>
                                <input className="form-control" name="email" type="text" onChange={handleChange} value={values.email} id="email" placeholder="Enter your email" />
                            </div>

                            <div className="form-group m-3">
                                <label className="fw-semibold" htmlFor="password">Password:</label>
                                <input className="form-control" name="password" type="password" id="password" onChange={handleChange} value={values.password} placeholder="Enter your password" />
                            </div>
                            <div className="form-group m-3">
                                <button className="btn btn-primary btn-block" disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
                            </div>
                        </form>
                        <div className="text-center m-3">
                            <div className="m-3">
                                <p>{values.isMember ? 'Not a member yet?' : 'Already a member?'} <a className="text-primary" onClick={changeMember}>{values.isMember ? 'Register' : 'Login'}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
