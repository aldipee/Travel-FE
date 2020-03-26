import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'
import { RoutesContext } from '../context/RouteContext'
export default class ModalRoutes extends Component {
  static contextType = RoutesContext
  state = {
    showModal: false
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.showModal} toggle={() => this.context.openModal()}>
          <ModalHeader toggle={() => this.context.openModal()}>Add new route</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.context.addData}>
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Label>Destination</Label>
                    <Input type="text" name="destination" placeholder="Ex : Jakarta" />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label>Destination Identifier Code</Label>
                    <Input type="text" maxLength={3} name="destinationCode" placeholder="Ex : JKT" />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label>Origin</Label>
                    <Input type="text" name="origin" placeholder="Ex : Bandung" />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <Label>Origin Identifier Code</Label>
                    <Input type="text" maxLength={3} name="originCode" placeholder="Ex : BDG" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Distance (Km)</Label>
                    <Input type="number" name="distance" placeholder="Ex : 785" />
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button color="success">Add Data</Button>
                <Button color="warning" onClick={this.context.openModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
