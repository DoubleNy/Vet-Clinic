import React from "react";
import style from "./GeneralInfos.module.css";
import { Button, Card } from "react-bootstrap";

const GeneralInfos = () => {
  return (
    <section className={style.Container}>
      <Card className={style.Card}>
        <Card.Img variant="top" src="/images/services.png" />
        <Card.Body>
          <Card.Title className={style.Title}>Services</Card.Title>
          <Card.Text className={style.Text}>
            We offer a varied range of veterinary services for your pet.
          </Card.Text>
        </Card.Body>
        <Card.Footer className={style.Footer}>
          <Button
            variant="primary"
            href="#GeneralInfos"
            style={{
              background: "#96616B",
              border: "none",
            }}
          >
            More
          </Button>
        </Card.Footer>
      </Card>

      <Card className={style.Card}>
        <div
          style={{
            height: "50%",
          }}
        >
          <Card.Img variant="top" src="/images/team.png" />
        </div>
        <Card.Body style={{ height: "50%" }}>
          <Card.Title className={style.Title}>Team</Card.Title>
          <Card.Text className={style.Text}>
            We have a young and eager time of talented experts.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="primary"
            href="#More"
            style={{
              background: "#96616B",
              border: "none",
            }}
          >
            More
          </Button>
        </Card.Footer>
      </Card>

      <Card className={style.Card}>
        <Card.Img variant="top" src="/images/news.png" />
        <Card.Body>
          <Card.Title className={style.Title}>News</Card.Title>
          <Card.Text className={style.Text}>
            Be in sync with our latest news & promotions.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="primary"
            href="#More"
            style={{
              background: "#96616B",
              border: "none",
            }}
          >
            Subscribe
          </Button>
        </Card.Footer>
      </Card>
    </section>
  );
};

export default GeneralInfos;
