import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const AddProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("bio", data.bio);
    formData.append("website", data.website);
    formData.append("location", data.location);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("birthDate", data.birthDate);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.post("http://localhost:3000/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Profile created successfully!");
      console.log("Profile created successfully:", response.data);
    } catch (error) {
      setErrorMessage("Error creating profile");
      console.error("Error creating profile:", error);
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
                    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("bio", { required: "Bio is required" })}
                          />
                          {errors.bio && <div className="text-danger">{errors.bio.message}</div>}
                        </InputGroup>
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
                            {...register("website", { required: "Website is required" })}
                          />
                          {errors.website && <div className="text-danger">{errors.website.message}</div>}
                        </InputGroup>
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
                            {...register("location", { required: "Location is required" })}
                          />
                          {errors.location && <div className="text-danger">{errors.location.message}</div>}
                        </InputGroup>
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
                            {...register("phoneNumber", { required: "Phone Number is required" })}
                          />
                          {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber.message}</div>}
                        </InputGroup>
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
                            {...register("birthDate", { required: "Birth Date is required" })}
                          />
                          {errors.birthDate && <div className="text-danger">{errors.birthDate.message}</div>}
                        </InputGroup>
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
                            {...register("image", { required: "Image is required" })}
                          />
                          {errors.image && <div className="text-danger">{errors.image.message}</div>}
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
