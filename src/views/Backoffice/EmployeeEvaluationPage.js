import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import EvaluationService from "components/EvaluationManagement/EvaluationService.js";
import EvaluationList from "components/EvaluationManagement/EvaluationList.js";
import { jwtDecode } from "jwt-decode";

const EmployeeEvaluationPage = () => {
    const [evaluations, setEvaluations] = useState([]);

    const fetchEvaluations = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const evaluationData = await EvaluationService.getEvaluationsByUser(userId);
            setEvaluations(evaluationData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchEvaluations();
    }, []);

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
                        <Col lg="12">
                            <Card className="shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <h2 className="mb-3">My Evaluations</h2>
                                        <p className="lead">
                                            View your past evaluations.
                                        </p>
                                    </div>
                                    <EvaluationList
                                        evaluations={evaluations}
                                        role={"employee"}
                                        onEvaluationUpdated={fetchEvaluations}
                                    />
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

export default EmployeeEvaluationPage;
