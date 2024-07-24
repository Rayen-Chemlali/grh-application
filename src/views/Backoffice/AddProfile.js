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

const AddProfile = () => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [bioError, setBioError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const usernames = response.data.map(user => user.username);
        setUsernames(usernames);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  const validateBio = () => {
    if (!bio) {
      setBioError("Bio is required.");
    } else {
      setBioError("");
    }
  };

  const validateWebsite = () => {
    if (!website) {
      setWebsiteError("Website is required.");
    } else {
      setWebsiteError("");
    }
  };

  const validateLocation = () => {
    if (!location) {
      setLocationError("Location is required.");
    } else {
      setLocationError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required.");
    } else {
      setPhoneNumberError("");
    }
  };

  const validateBirthDate = () => {
    if (!birthDate) {
      setBirthDateError("Birth Date is required.");
    } else {
      setBirthDateError("");
    }
  };

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
  };

  const validateImage = () => {
    if (!image) {
      setImageError("Image is required.");
    } else {
      setImageError("");
    }
  };

  const validateForm = () => {
    validateBio();
    validateWebsite();
    validateLocation();
    validatePhoneNumber();
    validateBirthDate();
    validateUsername();
    validateImage();
    return !bioError && !websiteError && !locationError && !phoneNumberError && !birthDateError && !usernameError && !imageError;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bio") setBio(value);
    if (name === "website") setWebsite(value);
    if (name === "location") setLocation(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "birthDate") setBirthDate(value);
    if (name === "username") setUsername(value);
    if (name === "image") setImage(files[0]);
  };

  const handleAddProfile = async (e) => {
    e.preventDefault();
    if (!isSubmit) {
      setIsSubmit(true);
      if (validateForm()) {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("website", website);
        formData.append("location", location);
        formData.append("phoneNumber", phoneNumber);
        formData.append("birthDate", birthDate);
        formData.append("username", username);
        if (image) {
          formData.append("image", image);
        }

        try {
          const response = await axios.post("http://localhost:3000/profile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setMessage("Profile created successfully!");
          setBio("");
          setWebsite("");
          setLocation("");
          setPhoneNumber("");
          setBirthDate("");
          setUsername("");
          setImage(null);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("There was an error creating the profile!");
          console.error("Error creating profile", error);
        }
      } else {
        setErrorMessage("Please correct the errors in the form.");
      }
      setIsSubmit(false);
    }
  };

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
                    <div className="text-muted text-center mb-3">
                      <small>Add New Profile</small>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Fill in the details below</small>
                    </div>
                    <Form role="form" onSubmit={handleAddProfile}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-copy-04" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Bio"
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={handleInputChange}
                            onBlur={validateBio}
                          />
                        </InputGroup>
                        {bioError && <div className="text-danger">{bioError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-world" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Website"
                            type="text"
                            name="website"
                            value={website}
                            onChange={handleInputChange}
                            onBlur={validateWebsite}
                          />
                        </InputGroup>
                        {websiteError && <div className="text-danger">{websiteError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-pin-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Location"
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleInputChange}
                            onBlur={validateLocation}
                          />
                        </InputGroup>
                        {locationError && <div className="text-danger">{locationError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone Number"
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleInputChange}
                            onBlur={validatePhoneNumber}
                          />
                        </InputGroup>
                        {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Birth Date"
                            type="date"
                            name="birthDate"
                            value={birthDate}
                            onChange={handleInputChange}
                            onBlur={validateBirthDate}
                          />
                        </InputGroup>
                        {birthDateError && <div className="text-danger">{birthDateError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            onBlur={validateUsername}
                          >
                            <option value="">Select Employee</option>
                            {usernames.map((username, index) => (
                              <option key={index} value={username}>
                                {username}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                        {usernameError && <div className="text-danger">{usernameError}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            onBlur={validateImage}
                          />
                        </InputGroup>
                        {imageError && <div className="text-danger">{imageError}</div>}
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
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="submit"
                          disabled={isSubmit}
                        >
                          Add Profile
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

export default AddProfile;
