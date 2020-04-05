import React from 'react'
import styled from 'styled-components'
import { convertToRupiah, converDate } from '../utils/conver'
import { Container, Col, Row, Card, Label as Lbl, FormGroup, CustomInput } from 'reactstrap'
const RowData = styled('div')`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 14px;
  margin: 10px;
  padding-left: 50px;
`
const Title = styled('h4')`
  font-size: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  width: 20%;
  padding-bottom: 7px;
`
const Name = styled('h3')`
  font-size: 20px;
  margin: 14px 0px;
`
const Label = styled(Lbl)`
  font-size: 16px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 300;
`
const UserProfile = ({ avatar, fullName, bod, gender, phoneNumber, fullAddress, balance }) => {
  return (
    <>
      <Container fluid={true}>
        <Row className="mt-3">
          <Col sm={12}>
            <Card style={{ padding: '20px' }}>
              <Row>
                <Col sm={3} className="text-center">
                  <img
                    className="img-thumbnail rounded-circle mt-2"
                    width="70%"
                    src={avatar}
                    alt="pic"
                  />
                  <Name>{fullName} </Name>
                </Col>
                <Col sm={9}>
                  <RowData>
                    <Title>User's Profile</Title>
                    <Row>
                      <Col sm="3">
                        <Label>Gender :</Label>
                        <span> {gender}</span>
                      </Col>
                      <Col sm="4">
                        <Label>Date of Birth :</Label>
                        <span>{bod && converDate(bod)}</span>
                      </Col>
                      <Col sm="5">
                        <Label>Phone Number :</Label>
                        <span>{phoneNumber}</span>
                      </Col>
                    </Row>
                  </RowData>
                  <RowData>
                    <Title>Account Info</Title>
                    <Row>
                      <Col sm="3">
                        <Label>Balance :</Label>
                        <span>{balance && convertToRupiah(balance)}</span>
                      </Col>
                      <Col sm="4">
                        <Label>Date of Birth :</Label>
                        <span> Female</span>
                      </Col>
                      <Col sm="4">
                        <Label>Phone Number :</Label>
                        <span> Female</span>
                      </Col>
                    </Row>
                  </RowData>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default UserProfile
