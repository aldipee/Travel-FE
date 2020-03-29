import React, { Component } from 'react'
import formSerizalize from 'form-serialize'
import axios from 'axios'
import config from '../../utils/config'

import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input,
  CardBody
} from 'reactstrap'

import { RoutesContext } from '../../context/RouteContext'
import Layout from '../layout/Dashboard.layout'
import InsertModal from '../../components/ModalRoutes'

class EditRoutes extends Component {
  static contextType = RoutesContext
  state = {
    destination: '',
    destinationCode: '',
    originCode: '',
    origin: '',
    distance: 0
  }
  componentDidMount() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token_user')}`
    const { id } = this.props.match.params
    axios.get(config.DATA_URL.concat(`routes/${id}`)).then(datas => {
      const { data } = datas
      this.setState({
        destination: data.data.destination,
        destinationCode: data.data.destination_code,
        origin: data.data.origin,
        originCode: data.data.origin_code,
        distance: data.data.distance
      })
    })
  }

  editData = e => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    axios
      .patch(
        config.DATA_URL.concat(`routes/${this.props.match.params.id}`),
        data
      )
      .then(data => {
        if (data.status === 200) {
          alert('data update')
          this.props.history.push('/routes')
        } else {
          alert('update failed')
        }
      })
  }

  inputHandler = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render() {
    return (
      <>
        <InsertModal showModal={this.context.showModal} />
        <Layout>
          <Container>
            <p>
              The starting state of the menu will appear collapsed on smaller
              screens, and will appear non-collapsed on larger screens. When
              toggled using the Button below, the menu will change.
            </p>
            <Row className="mx-2">
              <Card body>
                <CardTitle>All Routes</CardTitle>
                <Col sm="12">
                  <CardBody>
                    <Form onSubmit={this.editData}>
                      <FormGroup row>
                        <Label for="exampleEmail2" sm={2}>
                          Destination
                        </Label>
                        <Col sm={4}>
                          <Input
                            onChange={this.inputHandler}
                            type="text"
                            name="destination"
                            id="exampleEmail2"
                            placeholder="Ex : Palembang"
                            value={this.state.destination}
                          />
                        </Col>
                        <Label for="exampleEmail2" sm={2}>
                          Destination Code
                        </Label>
                        <Col sm={4}>
                          <Input
                            onChange={this.inputHandler}
                            type="text"
                            name="destinationCode"
                            id="exampleEmail2"
                            placeholder="Ex : PLG"
                            maxLength={3}
                            style={{ textTransform: 'uppercase' }}
                            value={this.state.destinationCode}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="exampleEmail2" sm={2}>
                          Origin
                        </Label>
                        <Col sm={4}>
                          <Input
                            onChange={this.inputHandler}
                            type="text"
                            name="origin"
                            id="exampleEmail2"
                            placeholder="Ex : Bandung"
                            value={this.state.origin}
                          />
                        </Col>
                        <Label for="exampleEmail2" sm={2}>
                          Origin Code
                        </Label>
                        <Col sm={4}>
                          <Input
                            onChange={this.inputHandler}
                            type="text"
                            name="originCode"
                            id="exampleEmail2"
                            placeholder="Ex : BDG"
                            maxLength={3}
                            style={{ textTransform: 'uppercase' }}
                            value={this.state.originCode}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="exampleEmail2" sm={2}>
                          Distance
                        </Label>
                        <Col sm={4}>
                          <Input
                            onChange={this.inputHandler}
                            type="text"
                            name="distance"
                            id="exampleEmail2"
                            placeholder="Distance"
                            value={this.state.distance}
                          />
                        </Col>
                      </FormGroup>
                      <Button className="px-4" color="success">
                        Edit
                      </Button>
                    </Form>
                  </CardBody>
                </Col>
              </Card>
            </Row>
          </Container>
        </Layout>
      </>
    )
  }
}

export default EditRoutes
