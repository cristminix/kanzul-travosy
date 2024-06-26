import { Button, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { signIn, useAuth } from "../../global/firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = ({}) => {
  const [validationErrors, setValidationErrors] = useState({})
  // const [cookies, setCookie] = useCookies(["uid", "requestToken"])
  const { isLoading, user } = useAuth()
  const isLogedIn = !!user

  const [errorMessages, setErrorMessages] = useState([])

  // const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const main = () => {
    setTimeout(() => {
      try {
        document.querySelector(`input.email`).focus()
      } catch (e) {}
    }, 512)
    // console.log(config)
  }
  const doForgetPassword = () => {
    setErrorMessages(["Sayang sekali sepertinya anda harus tanya admin untuk reset password anda"])
  }
  const onLogin = async () => {
    setValidationErrors(null)
    setErrorMessages([])
    let errorCount = 0
    let verrors = {}
    if (email.length == 0) {
      errorCount += 1
      verrors = { ...verrors, email: { message: "Email is required" } }
    }
    if (password.length == 0) {
      errorCount += 1
      verrors = { ...verrors, password: { message: "Password is required" } }
    }
    console.log(errorCount)
    if (errorCount > 0) {
      setValidationErrors({ ...verrors })
      console.log(validationErrors)
      const firstField = Object.keys(validationErrors)[0]
      setTimeout(() => {
        try {
          document.querySelector(`input.${firstField}`).focus()
        } catch (e) {
          console.error(e)
        }
      }, 512)
    } else {
      try {
        await signIn(email, password)
        // setCookie("uid", result.id)

        navigate("/")
      } catch (e) {
        const message = e.message.replace("FirebaseError:", "").replace("Firebase:", "")
        setErrorMessages([message])
      }
    }
    // console.log(email, password)
  }
  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    if (isLogedIn) {
      navigate("/")
      // document.location.reload()
    }
  }, [isLogedIn])
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img className="twx-mx-auto" src="/assets/images/logo/logo-dark.png" alt="logo" />
              </div>
              <div className="twx-text-center">
                {/* <h4 className="twx-mx-auto">Hello! let's get started</h4> */}
                <h6 className="font-weight-light">Login untuk melanjutkan</h6>
              </div>

              <Form
                className="pt-3"
                onSubmit={(e) => {
                  try {
                    console.log("hello")
                    onLogin()
                  } catch (e) {}
                  return e.preventDefault()
                }}>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    size="lg"
                    className="h-auto email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Kata Sandi"
                    size="lg"
                    className="h-auto password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  {errorMessages.map((item, index) => {
                    return (
                      <div className="alert alert-danger" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </Form.Group>
                <div className="mt-3">
                  <Button
                    type="submit"
                    size="sm"
                    className="text-center btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    <span className="twx-mx-auto">LOG IN</span>
                  </Button>
                </div>
                {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={(event) => event.preventDefault()} className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/user-pages/register" className="text-primary">
                      Create
                    </Link>
                  </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
