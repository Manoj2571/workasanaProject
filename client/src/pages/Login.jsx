import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUserAsync } from "../features/users/usersSlice"


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: null,
        password: null
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const {isUserLoggedIn} = useSelector((state) => state.users)

    useEffect(() => {
        if(isUserLoggedIn) {
            navigate("/dashboard")
        }
    }, [isUserLoggedIn, navigate])

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(loginUserAsync(user))
        .finally(() => setLoading(false))
    }

    return (
        <>
            <div className="container-fluid col-md-4 d-flex flex-column align-items-center px-lg-5 px-3 pt-5">
            <h1 className="fs-4 fw-semi-bold mt-5 mb-3" style={{color: "#712cf9"}}>workasana</h1>
            <h3>Log in to your account</h3>
            <p className="text-body-tertiary small fw-medium">Please enter your details</p>
            <form className="mt-3 w-100" onSubmit={handleLogin}>
            <label className="form-label fst-normal" htmlFor="emailInput">Email</label>
            <input type="email" placeholder="Enter your email" id="emailInput" className="form-control mb-3" onChange={(e) => setUser({...user, email: e.target.value})} required/>
            <label className="form-label" htmlFor="passwordInput">Password</label>
            <div className="form-control d-flex align-items-center justify-content-between mb-1" >
      <input
        type={showPassword ? 'text' : 'password'}
        className="password-input border-0"
        placeholder="Password"
        id="passwordInput"
        onChange={(e) => setUser({...user, password: e.target.value})} required
      />
      <span
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
      </span>
    </div>
            <button className="btn btn-primary w-100 my-3" type="submit" disabled={loading}>
  {loading ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : <span role="status">Sign In</span>}
</button>
            </form>
            <p className="mb-3">
        Don't have an account?{" "}
        <Link to="/signIn" className="text-primary fw-medium text-decoration-none">
          Register
        </Link>
      </p>
            </div>
            
            </>
    )
}

export default Login