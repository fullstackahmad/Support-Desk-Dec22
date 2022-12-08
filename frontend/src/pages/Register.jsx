import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useSelector - what is this ?
  // basically useSelector is used to connect REDUX STATE with REACT COMPONENTS
  // it returns a REDUX STATE so that we can store the values in REACT COMPONENTS
  const {user, isError, isLoading, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    // What is this ? DISPATCH
    // similar to useSelector hook but works vice-versa
    // DISPTACH is also a react-redux library/tool
    dispatch(reset())
    // it dispatches the state/value/action from REACT COMPONENT to REDUX
    // so that we can use it with REDUX ACTION/REDUCER
    // in our case we are dispatching reset action call to "authSlice.actions"
    // which we imported already in this "Register JSX REACT component"
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
   }

   const onSubmit = (e) => {
    e.preventDefault()

    // if password matched, dispatch userData
    if(password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      // What is this ? DISPATCH
      // similar to useSelector hook but works vice-versa
      // DISPTACH is also a react-redux library/tool
      dispatch(register(userData))
      // it dispatches the state/value from REACT COMPONENT to REDUX
      // so that we can use it with REDUX ACTION/REDUCER
      // in our case we are dispatching REGISTER ASYNC FUNCTION to "authSlice"
      // which we imported already in this "Register JSX REACT component"
    }
   }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register 
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input 
              type="text"
              className="form-control"
              id='name'
              name='name'
              value={name} 
              onChange={onChange} 
              placeholder='Enter your name'
              required
            />
          </div>

          <div className="form-group">
            <input 
              type="email"
              className="form-control"
              id='email'
              name='email'
              value={email} 
              onChange={onChange} 
              placeholder='Enter your email'
              required
            />
          </div>

          <div className="form-group">
            <input 
              type="password"
              className="form-control"
              id='password'
              name='password'
              value={password} 
              onChange={onChange} 
              placeholder='Enter your password'
              required
            />
          </div>

          <div className="form-group">
            <input 
              type="password"
              className="form-control"
              id='password2'
              name='password2'
              value={password2} 
              onChange={onChange} 
              placeholder='Confirm Password'
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register