import React from "react";
import { Container, Row } from "react-bootstrap";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";

const SecondaryLayout = ({children}) => {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <Container>
            <Row>
              {children}
            </Row>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SecondaryLayout;
