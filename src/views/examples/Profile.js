import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const mainRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    console.log("oussema amri")
    const fetchProfile = async () => {
      const user =  JSON.parse(localStorage.getItem("user"));
      console.log( "profile id",user.profile.id);
      console.log("oussema amri")
    
      if(user){
      const userId = user.profile.id; 
      console.log(userId);

      try {
        const response = await axios.get(`http://localhost:3000/profile/${userId}`);
        setProfile(response.data);
        console.log(response.data.image);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the profile!", error);
      }
    };}

    fetchProfile();
  }, []);

  if (profile === null) {
    return (<><DemoNavbar />
          <main className="profile-page" ref={mainRef}>
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff" }}>
                Still No Profile
              </h1>
            </div>
    </section>
    </main>
    <SimpleFooter />
    </>);
  }

  return (
    <>
      <DemoNavbar />
      <main className="profile-page" ref={mainRef}>
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={profile.image ? `http://localhost:3000/uploads/${profile.image}` : require("assets/img/theme/team-1-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">

                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </Col>
                  <div className="shape shape-style-1 shape-default">
              

              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span >
              </span>
            </div>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">your</span>
                        <span className="description">-</span>
                      </div>
            

                      <div>
                        <span className="heading">Profile</span>
                        <span className="description">-</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {profile.nom} {profile.prenom}{" "}
                    <span className="font-weight-light">, {profile.age || "N/A"}</span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {profile.lieuDeTravail}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {profile.metier} - {profile.pole}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {profile.filiere}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        {profile.responsable && `Responsable: ${profile.responsable}`}
                        <br />
                        {profile.email && `Email: ${profile.email}`}
                        <br />
                        {profile.civilite && `Civilité: ${profile.civilite}`}
                        <br />
                        {profile.sexe && `Sexe: ${profile.sexe}`}
                        <br />
                        {profile.nationalite && `Nationalité: ${profile.nationalite}`}
                        <br />
                        {profile.dateEtLieuDeNaissance && `Date et lieu de naissance: ${profile.dateEtLieuDeNaissance}`}
                        <br />
                        {profile.adresseDomicile && `Adresse domicile: ${profile.adresseDomicile}`}
                      </p>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Show more
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>

  );
};

export default Profile;
