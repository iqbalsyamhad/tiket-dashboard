import React, { useState } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import SelectAirportComponent from '../SelectAirportComponent';

import DatePicker from 'react-datepicker';
import './react-datepicker.css';

const cabinList = ['ECONOMY', 'BUSINESS', 'FIRST', 'PREMIER'];

const FormTixComponent = () => {
  let [departure, setDeparture] = useState('');
  let [arrival, setArrival] = useState('');
  let [tglBerangkat, setTglBerangkat] = useState(new Date());
  let [tglPulang, setTglPulang] = useState(new Date().setDate(new Date().getDate() + 2));
  let [dewasa, setDewasa] = useState(1);
  let [anak, setAnak] = useState(1);
  let [bayi, setBayi] = useState(0);
  let [cabin, setCabin] = useState(cabinList[0]);

  const handleDepartureChange = (value) => {
    setDeparture(value);
  };

  const handleArrivalChange = (value) => {
    setArrival(value);
  };

  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    var now = date.getDay();
    var isWeekend = now === 0;

    var d = new Date();
    var n = d.getMonth();

    let libur = isWeekend ? 'libur' : '';

    if (date.getMonth() > n) libur = libur + ' offset-date';

    return (
      <span className={libur} title={tooltipText}>
        {day}
      </span>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tglBerangkatVal = document.getElementsByName('tglBerangkat')[0].value;
    const tglPulangVal = document.getElementsByName('tglPulang')[0].value;
    console.log(
      departure,
      arrival,
      tglBerangkatVal,
      tglPulangVal,
      dewasa,
      anak,
      bayi,
      cabin
    );
  };

  return (
    <Container className="border rounded p-4 mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="departureSearch">
            <Form.Label>Dari</Form.Label>
            <SelectAirportComponent
              name="departure"
              placeholder="Dari"
              onChange={handleDepartureChange}
              isDisabled={0}
            />
          </Form.Group>

          <Form.Group as={Col} md={6} xs={12} controlId="formGridPassword">
            <Form.Label>Ke</Form.Label>
            <SelectAirportComponent
              name="arrival"
              placeholder="Ke"
              onChange={handleArrivalChange}
              isDisabled={0}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} xs={12} controlId="formGridPassword">
            <Form.Label>Berangkat</Form.Label>
            <DatePicker
              className="form-control"
              name="tglBerangkat"
              selected={tglBerangkat}
              onChange={(date) => setTglBerangkat(date)}
              minDate={new Date()}
              monthsShown={2}
              renderDayContents={renderDayContents}
              dateFormat="yyyy-MM-dd"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport',
                },
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} xs={12} controlId="formGridPassword">
            <Form.Label>Pulang</Form.Label>
            <DatePicker
              className="form-control"
              name="tglPulang"
              selected={tglPulang}
              onChange={(date) => setTglPulang(date)}
              minDate={new Date()}
              monthsShown={2}
              renderDayContents={renderDayContents}
              dateFormat="yyyy-MM-dd"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport',
                },
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={2} xs={4} controlId="formGridPassword">
            <Form.Label>Dewasa</Form.Label>
            <Form.Control
              value={dewasa}
              name="dewasa"
              type="number"
              placeholder="Enter Dewasa"
              min="0"
              onChange={(e) => setDewasa(e.target.value)}
            />
            <Form.Text muted>Usia 12+</Form.Text>
          </Form.Group>
          <Form.Group as={Col} md={2} xs={4} controlId="formGridPassword">
            <Form.Label>Anak</Form.Label>
            <Form.Control
              value={anak}
              name="anak"
              type="number"
              placeholder="Enter Anak"
              min="0"
              onChange={(e) => setAnak(e.target.value)}
            />
            <Form.Text muted>Usia 2-11</Form.Text>
          </Form.Group>
          <Form.Group as={Col} md={2} xs={4} controlId="formGridPassword">
            <Form.Label>Bayi</Form.Label>
            <Form.Control
              value={bayi}
              name="bayi"
              type="number"
              placeholder="Enter Bayi"
              min="0"
              onChange={(e) => setBayi(e.target.value)}
            />
            <Form.Text muted>Dibawah 2</Form.Text>
          </Form.Group>
          <Form.Group as={Col} md={6} xs={12} controlId="formGridPassword">
            <Form.Label>Kelas Kabin</Form.Label>
            <Form.Control as="select" onChange={(e) => setCabin(e.target.value)}>
              {cabinList.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Cari Penerbangan</Button>
      </Form>
    </Container>
  );
};

export default FormTixComponent;
