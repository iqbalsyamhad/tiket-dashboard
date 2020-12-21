import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button, ListGroup } from 'react-bootstrap';
import { ListGroupContainer } from './FormTixElements';

const FormTixComponent = () => {
  let [departure, setDeparture] = useState('');
  let [departureList, setDepartureList] = useState([]);
  let [showElement, setShowElement] = useState(false);
  let [clickedList, setClickedList] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`http://api.dreamtour.co/api/v1/tiketcom/flight/airports?city=${departure}&airport=${departure}&country=${departure}`);
      response = await response.json();
      setDepartureList(response);
    }

    if (departure.length > 2) {
      fetchMyAPI();
      setShowElement(true);
    } else {
      setDepartureList([]);
      setShowElement(false);
    }
  }, [departure]);

  const onBlurHandler = (e) => {
    if (!e.relatedTarget) {
      setShowElement(false);
    }
  };
  console.log(showElement);
  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="departure"
              value={departure}
              placeholder="Keberangkatan"
              onChange={(e) => setDeparture(e.target.value)}
              onBlur={onBlurHandler}
              onFocus={(e) => setShowElement(true)}
            />
            <ListGroupContainer show={showElement ? 1 : 0}>
              {departureList.data?.airports.length > 0
                ? departureList.data.airports.map((el) => {
                    return (
                      <ListGroup.Item tabIndex="0" className="airports" key={el.airport_code} onClick={(e) => setDeparture(el.airport_name)}>
                        <strong>{el.airport_name}</strong> <em>{el.airport_code}</em>
                        <div>
                          {el.city_name}, {el.country_name}
                        </div>
                      </ListGroup.Item>
                    );
                  })
                : false}
            </ListGroupContainer>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormTixComponent;
