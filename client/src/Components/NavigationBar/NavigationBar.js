import React, { useRef } from "react";
import style from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import Login from "../Auth/Login/Login";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = (props) => {
  const ref = useRef(null);

  const handleLogout = () =>
    logout()
      .then(() => {
        props.setUser(() => "");
        localStorage.removeItem("token");
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });

  return (
    <Container
      style={{
        backgroundColor: "#5863F8",
        fontWeight: 800,
      }}
      fluid={true}
      ref={ref}
    >
      <Navbar
        collapseOnSelect
        // toggled
        className="border-bottom text-white"
        bg="transparent"
        expand="md"
        ref={ref}
      >
        {!props.user ? (
          <Login setUser={props.setUser} history={props.history} />
        ) : (
          <>
            <Navbar.Brand
              className="text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Link to="/" style={{ marginLeft: "5%" }}>
                <img
                  src="/images/home-logo-white.png"
                  alt=""
                  style={{ width: "2rem", color: "#fff" }}
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              className="border-0 navbar-dark"
              aria-controls="navbar-toggle"
            />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto" style={{ textAlign: "right" }}>
                <div className={style.navItems}>
                  {props.isEmployee && (
                    <>
                      <div className={style.coupleItems}>
                        <LinkContainer to="/users">
                          <Nav.Link className="nav-link text-white">
                            Users
                          </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/pets">
                          <Nav.Link className="nav-link text-white">
                            Patients
                          </Nav.Link>
                        </LinkContainer>
                      </div>

                      <div className={style.coupleItems}>
                        <LinkContainer to="/scheduler">
                          <Nav.Link className="nav-link text-white">
                            Scheduler
                          </Nav.Link>
                        </LinkContainer>
                        {props.unreadMessages ? (
                          <div className={style.Notification}>
                            <span
                              style={{
                                color: "red",
                                font: "bold",
                                margin: "0 5%",
                              }}
                            >{`${props.unreadMessages} new`}</span>
                          </div>
                        ) : null}
                        <LinkContainer to="/messages">
                          <Nav.Link
                            className="nav-link text-white"
                            style={{
                              width: "7rem",
                            }}
                          >
                            Messages
                          </Nav.Link>
                        </LinkContainer>
                      </div>
                    </>
                  )}
                  <div className={style.coupleItems}>
                    <LinkContainer to={`/users/${props.user._id}`}>
                      <Nav.Link className="nav-link text-white">
                        Profile
                      </Nav.Link>
                    </LinkContainer>
                    <button
                      className={style.Button}
                      onClick={handleLogout}
                      style={{
                        paddingLeft: "2rem",
                        fontWeight: 800,
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
