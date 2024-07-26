import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DocumentList from 'components/DocumentManagement/DocumentList';
import UploadDocument from 'components/DocumentManagement/UploadDocument';

const DocumentManagementPage = () => {
    const { userId } = useParams();
    const [refresh, setRefresh] = useState(false);

    const handleRefreshDocuments = () => {
        setRefresh(prev => !prev);
    };

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
                                        <h2 className="mb-3">List of Documents</h2>
                                        <p className="lead">Here you can view and manage the uploaded documents.</p>
                                    </div>
                                    <DocumentList userId={userId} refresh={refresh} />

                                    <div className="text-center text-muted mt-5 mb-4">
                                        <h2 className="mb-3">Upload New Document</h2>
                                        <p className="lead">Upload new documents using the form below.</p>
                                    </div>
                                    <UploadDocument userId={userId} onUploadSuccess={handleRefreshDocuments} />
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

export default DocumentManagementPage;
