import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
        setRoles(response.data);
        const user =  JSON.parse(localStorage.getItem("user"));
        setRole(user.role.name);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/role/1");
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchRoles()
    fetchManagers();
  }, []);

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
  };

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
    validateUsername();
    validateEmail();
    validatePassword();
    return !usernameError && !emailError && !passwordError;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "roleId") setSelectedRoleId(value);
    if (name === "managerId") setSelectedManagerId(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isSubmit) {
      setIsSubmit(true);
      if (validateForm()) {
        try {
          const response = await axios.post("http://localhost:3000/users/signup", {
            username,
            email,
            password,
            roleId: selectedRoleId,
            managerId: selectedManagerId,
          });
          setMessage("User registered successfully!");
          setUsername("");
          setEmail("");
          setPassword("");
          setSelectedRoleId("");
          setSelectedManagerId("");
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("There was an error registering the user!");
          console.error("Error registering the user", error);
        }
      } else {
        setErrorMessage("Please correct the errors in the form.");
      }
      setIsSubmit(false);
    }
  };

  if (role !== "admin") {
    return navigate('/accesDenied');
  }

  return (
      <>
        <DemoNavbar />
        <main>
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
                        <small>sign up with credentials</small>
                      </div>
                      <Form role="form" onSubmit={handleRegister}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Name"
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                                onBlur={validateUsername}
                            />
                          </InputGroup>
                          {usernameError && (
                              <div className="text-danger">{usernameError}</div>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
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
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Password"
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                onBlur={validatePassword}
                            />
                          </InputGroup>
                          {passwordError && (
                              <div className="text-danger">{passwordError}</div>
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
                                type="select"
                                name="roleId"
                                value={selectedRoleId}
                                onChange={handleInputChange}
                            >
                              <option value="">Select Role</option>
                              {roles.map((role) => (
                                  <option key={role.id} value={role.id}>
                                    {role.name}
                                  </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="select"
                                name="managerId"
                                value={selectedManagerId}
                                onChange={handleInputChange}
                            >
                              <option value="">Select Manager</option>
                              {managers.map((manager) => (
                                  <option key={manager.id} value={manager.id}>
                                    {manager.username}
                                  </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        {message && (
                            <div className="text-center mb-3 alert alert-success">
                              <small>{message}</small>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="text-center mb-3 alert alert-danger">
                              <small>{errorMessage}</small>
                            </div>
                        )}
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                  className="custom-control-input"
                                  id="customCheckRegister"
                                  type="checkbox"
                              />
                              <label
                                  className="custom-control-label"
                                  htmlFor="customCheckRegister"
                              >
                              <span>
                                I agree with the{" "}
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button
                              className="mt-4"
                              color="primary"
                              type="submit"
                              disabled={isSubmit}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
  );
};

export default Register;
