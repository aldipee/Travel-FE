import React, { Component } from 'react'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  FormText
} from 'reactstrap'
import styled from 'styled-components'
import FormSerialize from 'form-serialize'
import axios from 'axios'
import config from '../../utils/config'

import { RoutesContext } from '../../context/RouteContext'
const Img = styled('img')`
  width: 70%;
  margin-left: 3rem;
`
export default class ModalRoutes extends Component {
  static contextType = RoutesContext
  state = {
    showModal: false,
    previewImage: null,
    file: null
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal
    })
  }
  inputHandler = (e) => {
    this.setState({
      previewImage: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    })
  }
  addData = async (e) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    e.preventDefault()
    const data = FormSerialize(e.target, { hash: true })
    const formData = new FormData()
    formData.append('picture', this.state.file)
    formData.append('busName', data.busName)
    formData.append('totalSeat', data.totalSeat)
    const res = await axios.post(config.DATA_URL.concat('bus'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.data.status) {
      this.setState({
        showModal: false
      })
    } else {
      alert('Failed to insert data')
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.showModal} toggle={() => this.props.openModal()}>
          <ModalHeader toggle={() => this.props.openModal()}>
            Add new Bus for your Agency
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addData}>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label>Bus Name</Label>
                    <Input type="text" name="busName" placeholder="Ex : Prima Putra" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Seats Capacity</Label>
                    <Input type="number" name="totalSeat" placeholder="Ex : 100" />
                  </FormGroup>
                </Col>
                <Col sm="6">{this.state.previewImage && <Img src={this.state.previewImage} />}</Col>
                <Col sm="6">
                  <FormGroup>
                    <Label>Origin Identifier Code</Label>
                    <Input type="file" name="picture" onChange={this.inputHandler} />
                    <FormText color="muted">
                      This is some placeholder block-level help text for the above input. It's a bit
                      lighter and easily wraps to a new line.
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button color="success">Add Bus</Button>
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
