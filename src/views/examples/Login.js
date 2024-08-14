import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useNavigate, Navigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [auth, setAuth] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const mainRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home-page");
    }
  }, [navigate]);

  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();
    return !emailError && !passwordError;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isSubmit) {
      setIsSubmit(true);
      if (validateForm()) {
        try {
          const response = await axios.post("http://localhost:3000/auth/login", {
            email,
            password,
          });
          setMessage("Login successful!");
          const token = response.data;
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;
          localStorage.setItem("token", token);
          const response1 = await axios.get(`http://localhost:3000/users/${id}`);
          const user = JSON.stringify(response1.data);
          localStorage.setItem("user", user);
          window.dispatchEvent(new Event('storage'));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          navigate("/home-page");
        } catch (error) {
          setMessage("Error logging in: wrong email or password.");
          console.error("Error logging in", error);
        }
      }
      setIsSubmit(false);
    }
  };
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home-page" />;
  }

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">

                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form" onSubmit={handleSignIn}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            onBlur={validateEmail}
                          />
                        </InputGroup>
                        {emailError && (
                          <div className="text-danger">{emailError}</div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            onBlur={validatePassword}
                            autoComplete="off"
                          />
                        </InputGroup>
                        {passwordError && (
                          <div className="text-danger">{passwordError}</div>
                        )}
                      </FormGroup>
                      {message && (
                        <div className="text-center mb-3 alert alert-danger">
                          <small>{message}</small>
                        </div>
                      )}
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckLogin"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit"
                          disabled={isSubmit} // Disable the button while the form is being submitted
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Login;
