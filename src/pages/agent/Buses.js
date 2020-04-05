import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import formSerizalize from 'form-serialize'

import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input
} from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline, mdiSort } from '@mdi/js'
import { MdAirportShuttle } from 'react-icons/md'

import { BusContext } from '../../context/BusContext'
import InsertModal from '../../components/buses/ModalBuses'
import styled from 'styled-components'

const BusTitle = styled('h5')`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.8);
`
const BusDesc = styled('h5')`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`
const LinkTo = styled(Link)`
  &:hover : {
    border: 1px solid red;
    cursor: pointer;
    text-decoration: none;
  }
`

function Buses(props) {
  const busData = useContext(BusContext)
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(!showModal)
  useEffect(() => {
    busData.actions.loadData()
  }, [])
  console.log(busData)

  const newItem = (
    <>
      <Row className="my-2">
        {busData.data &&
          busData.data.map((data, index) => (
            <Col sm={4} className="my-2">
              <Card>
                <LinkTo to={`${props.match.path}/edit/${data && data.id}`}>
                  <Row className="px-3 my-2">
                    <Col sm={3}>
                      <MdAirportShuttle color=" rgba(0,0,0,0.1)" size={50} />
                    </Col>
                    <Col sm={8}>
                      <BusTitle>{data && data.name}</BusTitle>
                      <BusDesc>{data && data.total_seat} seats</BusDesc>
                    </Col>
                  </Row>
                </LinkTo>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )

  const item = (
    <>
      <thead>
        <tr>
          <th width="7%">
            # <Icon path={mdiSort} size={1} color="#8d9498" />
          </th>
          <th width="47%">Bus Name</th>
          <th>Total Seats</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {busData.data &&
          busData.data.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td width="25%">
                <Link to={`${props.match.path}/details/${data.id}`}>{data && data.name}</Link>
              </td>
              <td width="15%">{data && data.total_seat}</td>

              <td width="10%">
                <Link to={`${props.match.path}/edit/${data && data.id}`}>
                  <Icon id="EditData" path={mdiFileEditOutline} size={1} color="#8d9498" />
                  <UncontrolledTooltip placement="right" target="EditData">
                    Edit Data
                  </UncontrolledTooltip>
                </Link>
                <Button close>
                  <Icon id="DeleteData" path={mdiDeleteOutline} size={1} color="#8d9498" />
                  <UncontrolledTooltip placement="right" target="DeleteData">
                    Delete Data
                  </UncontrolledTooltip>
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  )
  const placeholderItems = Array.from(Array(4).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th name="no">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>

          <th>
            <div className="placeholder"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {placeholderItems.map((data) => (
          <tr>
            <td width="8%">
              <div className="placeholder"></div>
            </td>
            <td width="25%">
              <div className="placeholder"></div>
            </td>
            <td width="10%">
              <div className="placeholder"></div>
            </td>

            <td>
              <div className="placeholder"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )

  return (
    <>
      <InsertModal showModal={showModal} openModal={openModal} />

      <Container fluid={true}>
        <Row>
          <Col sm="6" className="my-3">
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional content.
              </CardText>
            </Card>
          </Col>
          <Col sm="12">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="6">All Routes</Col>
                  <Col sm="6" className="text-right">
                    <Button onClick={openModal}>Add Bus</Button>
                  </Col>
                </Row>
                <Row className="mt-3 mb-1">
                  <Col sm="12">
                    <Form inline>
                      <FormGroup className="mr-4">
                        <Input type="text" name="searchValue" placeholder="Search by name.." />
                      </FormGroup>
                      <Col>
                        <FormGroup className="mr-4">
                          <Input type="select" name="limit">
                            <option value="5">Show 5 data</option>
                            <option value="10">Show 10 data</option>
                            <option value="20">Show 20 data</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Button>Go!</Button>
                    </Form>
                  </Col>
                </Row>
              </CardTitle>
              <Table>{busData.isLoading ? placeholder : newItem}</Table>
              <Row>
                <Col md={6} className="text-center"></Col>
                <Col md={6} className="text-center"></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Buses
