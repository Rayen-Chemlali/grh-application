import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import EvaluationForm from "components/EvaluationManagement/EvaluationForm.js";

const EvaluationPage = () => {
    return (
        <main>
            <DemoNavbar />
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
                        <Col lg="8">
                            <Card className="shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <EvaluationForm />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <SimpleFooter />
        </main>
    );
};

export default EvaluationPage;
