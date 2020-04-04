import React from 'react'
import {
  Col,
  Row as Aw,
  ListGroupItem as Item,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import { IoIosBus, IoMdSwap, IoMdContacts } from 'react-icons/io'
import styled from 'styled-components'
const ListGroupItem = styled(Item)`
  margin: 10px 0px 8px 0px;
  border: 1px solid #7f7f7f !important;
  border-radius: 0 !important;
`
const PriceTag = styled('div')`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  background: #007bff;
  margin-top: 40%;
`
const Line = styled('hr')`
  border-top: 2px dotted #007bff;
  letter-spacing: 100px;
`
const WrapperPrice = styled(Col)`
background: #007bff;

clip-path: circle(77.8% at 75% 31%);
margin; 0;

`
const WrapperLine = styled('div')`
  && .text {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: -10px;
  }
  && div {
    color: rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 0px;
    font-weight: bold;
    font-size: 1.3rem;
  }
`
const WrapperTime = styled('div')`
  margin-top: 20px !important;
`
const Icon = styled(IoMdSwap)`
  background: #007bff;
  padding: 4px;
  margin: 13px 10px 0px 10px;
  color: #fff;
  border-radius: 50%;
`
const Row = styled(Aw)`
  font-weight: 700;

  font-size: 1.1rem;
  font-family: 'Noto Sans KR', sans-serif;
`

function SchedulesItem({ name, totalSeats, price, time, date }) {
  return (
    <>
      <ListGroupItem>
        <Row>
          <Col md={2}>
            <ListGroupItemHeading>
              <img
                alt="logo"
                className="img-fluid img-responsive"
                src="https://cdn.freebiesupply.com/logos/large/2x/fly-emirates-logo-png-transparent.png"
              />
            </ListGroupItemHeading>
          </Col>
          <Col md={8}>
            <ListGroupItemText>
              <Row>
                <Col sm={5}>
                  <div className="px-4">
                    <IoIosBus size={25} color={'rgba(0, 0, 0, 0.3)'} />
                    {name}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="px-4">
                    <IoMdContacts size={25} color={'rgba(0, 0, 0, 0.3)'} />
                    {totalSeats} Seats Available
                  </div>
                </Col>
              </Row>
              <WrapperTime className="d-flex">
                <WrapperLine className="px-4">
                  <span className="text">Departure</span> <div>08:00 AM</div>
                </WrapperLine>
                <Line className="my-auto flex-grow-1" />
                <Icon size={30} />
                <Line className="my-auto flex-grow-1" />
                <WrapperLine className="px-4">
                  <span className="text">Arrival</span> <div>07:30 PM</div>
                </WrapperLine>
              </WrapperTime>
            </ListGroupItemText>
          </Col>
          <WrapperPrice md={2}>
            <PriceTag>{price}</PriceTag>
          </WrapperPrice>
        </Row>
      </ListGroupItem>
    </>
  )
}

export default SchedulesItem
