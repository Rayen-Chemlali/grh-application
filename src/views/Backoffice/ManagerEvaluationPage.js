import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import EvaluationService from "components/EvaluationManagement/EvaluationService.js";
import EvaluationList from "components/EvaluationManagement/EvaluationList.js";
import EvaluationFilter from "components/EvaluationManagement/EvaluationFilter.js";
import { jwtDecode } from "jwt-decode";

const ManagerEvaluationPage = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const managerId = decodedToken.id;
    const [users, setUsers] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [filteredUser, setFilteredUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const managedUsers = await EvaluationService.getManagedUsers(managerId);
                setUsers(managedUsers);
            } catch (error) {
                console.error("Error fetching managed users:", error);
            }
        };

        fetchUsers();
    }, [managerId]);

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const evaluations = await EvaluationService.getEvaluationsByManager(managerId);
                setEvaluations(evaluations);
            } catch (error) {
                console.error("Error fetching evaluations:", error);
            }
        };

        fetchEvaluations();
    }, [managerId, refresh]);

    const handleFilterChange = (userId) => {
        setFilteredUser(userId !== "" ? parseInt(userId, 10) : null);
    };

    const handleEvaluationSubmit = async (evaluationData) => {
        try {
            await EvaluationService.createEvaluation(evaluationData);
            setRefresh(!refresh); // Toggle refresh to re-fetch evaluations
        } catch (error) {
            console.error("Error creating evaluation:", error);
        }
    };

    const filteredEvaluations = filteredUser
        ? evaluations.filter((evaluation) => evaluation.user.id === filteredUser)
        : evaluations;

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
                                        <h2 className="mb-3">Employee Evaluations</h2>
                                        <p className="lead">
                                            Create and review employee evaluations.
                                        </p>
                                    </div>
                                    <EvaluationFilter
                                        users={users}
                                        selectedUser={filteredUser}
                                        onChange={handleFilterChange}
                                    />
                                    <EvaluationList
                                        evaluations={filteredEvaluations}
                                        role={"manager"}
                                        onEvaluationUpdated={() => setRefresh(!refresh)} // Callback to refresh data
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

export default ManagerEvaluationPage;
