import React from 'react';
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import SimpleFooter from "../../components/Footers/SimpleFooter";
import UserTable from "../../components/UserManagement/UserTable";
import {Container,Row,Col} from "reactstrap";

const UserTablePage = () => {
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
                            <UserTable />
                        </Col>
                    </Row>
                </Container>
            </section>
            <SimpleFooter />
        </main>
    );
};

export default UserTablePage;
