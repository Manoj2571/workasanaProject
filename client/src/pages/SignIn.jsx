import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signupUserAsync } from "../features/users/usersSlice"
import { useNavigate } from "react-router-dom"

const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        name: null,
        email: null,
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const [isPasswordStrong, setIsPasswordStrong] = useState(false)

    const passwordHandler = (e) => {
        const password = e.target.value;
        setNewUser({ ...newUser, password });
        if (
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[^A-Za-z0-9]/.test(password) &&
          /\d/.test(password) &&
          password.length >= 8
        ) {
          setIsPasswordStrong(true);
        } else {
          setIsPasswordStrong(false);
        }
      };

    const handleRegisterUser = (e) => {
        e.preventDefault()
        setLoading(true)

        if(isPasswordStrong) {
            dispatch(signupUserAsync(newUser)).then(() => navigate("/login")).finally(() => setLoading(false))
        } else {
            if(!(/[a-z]/.test(newUser.password))) {toast.error("Password must include at least one lowercase letter.")}
            if(!(/[A-Z]/.test(newUser.password))) {toast.error("Password must include at least one uppercase letter.")}
            if(!(/[^A-Za-z0-9]/).test(newUser.password)) {toast.error("Password must include at least one special character (e.g. !@#$%^&*).")}
            if(!(/\d/.test(newUser.password))) {toast.error("Password must include at least one number.")}
            if(newUser.password.length < 8) {toast.error("Password must be at least 8 characters long.")}
        }

        
    }
    

    return (
        <>
            <div className="container-fluid col-md-4  d-flex flex-column align-items-center px-lg-5 px-3 pt-5">
            <h1 className="fs-4 fw-semi-bold mt-5 mb-3" style={{color: "#712cf9"}}>workasana</h1>
            <h3 cl>Sign Up</h3>
            <form className="mt-3" onSubmit={handleRegisterUser}>
            <label className="form-label fst-normal">Name</label>
            <input type="text" placeholder="Full name" className="form-control mb-3" onChange={(e) => setNewUser({...newUser, name: e.target.value})} required/>
            <label className="form-label fst-normal">Email</label>
            <input type="email" placeholder="example@domain.com" className="form-control mb-3" onChange={(e) => setNewUser({...newUser, email: e.target.value})} required/>
            <label className="form-label">Password</label>
            <input type="password" placeholder="Password" className="form-control mb-1" onChange={passwordHandler} required/>
            <p className="text-body-tertiary small fw-medium">Must be 8 or more characters and contain at least 1 number and 1 special character.</p>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
  {loading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : <span role="status">Register</span>}
  
</button>
            </form>
            <p className="my-3">
        Already have an account?{" "}
        <Link to="/login" className="text-primary fw-medium text-decoration-none">
          Sign In
        </Link>
      </p>
            </div>
            </>
    )
}

export default SignIn