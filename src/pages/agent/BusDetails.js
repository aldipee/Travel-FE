import React, { Component } from 'react'
import formSerizalize from 'form-serialize'
import axios from 'axios'
import config from '../../utils/config'
import { Link } from 'react-router-dom'
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
  CardBody
} from 'reactstrap'

import { RoutesContext } from '../../context/RouteContext'
import InsertModal from '../../components/ModalRoutes'

class BusEdit extends Component {
  static contextType = RoutesContext
  state = {
    data: {},
    busName: '',
    total_seat: 0,
    picViewer: null,
    file: null,
    isLoading: true
  }
  componentDidMount() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token_user')}`
    const { id } = this.props.match.params
    axios.get(config.DATA_URL.concat(`bus/${id}`)).then(datas => {
      const { data } = datas
      this.setState({
        data: {
          ...data.data,
          picture: config.DATA_URL.concat(`public/users/${data.data.picture}`)
        },
        busName: data.data.name,
        total_seat: data.data.total_seat,
        picViewer: config.DATA_URL.concat(`public/users/${data.data.picture}`),
        isLoading: false
      })
    })
  }

  editData = async e => {
    e.preventDefault()
    const { id } = this.props.match.params
    const data = formSerizalize(e.target, { hash: true })
    const formData = new FormData()
    formData.append('busName', data.busName)
    formData.append('totalSeat', data.total_seat)
    formData.append('picture', this.state.file)
    const res = await axios.patch(
      config.DATA_URL.concat(`bus/${id}`),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (res.data.status) {
      alert('Data updated')
      this.props.history.push('/buses')
    } else {
      alert('Failed to insert data')
    }

    // axios
    //   .patch(
    //     config.DATA_URL.concat(`routes/${this.props.match.params.id}`),
    //     data
    //   )
    //   .then(data => {
    //     if (data.status === 200) {
    //       alert('data update')
    //       this.props.history.push('/routes')
    //     } else {
    //       alert('update failed')
    //     }
    //   })
  }

  fileHandler = e => {
    this.setState({
      picViewer: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
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
        <Container>
          <Row className="mx-2 my-3">
            <Card body>
              <CardTitle>Details Bus #{this.state.data.id}</CardTitle>
              <Col sm="12">
                <CardBody>
                  <Form onSubmit={this.editData}>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                        Bus name
                      </Label>
                      <Col sm={6}>
                        <span>{this.state.busName}</span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                        Total Seats
                      </Label>
                      <Col sm={4}>
                        <span>{this.state.total_seat}</span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                        Current Picture
                      </Label>
                      <Col sm={4}>
                        <img width="50%" src={this.state.picViewer} />
                      </Col>
                    </FormGroup>

                    <Button className="px-4" color="success">
                      <Link to={`/buses/edit/${this.state.data.id}`}>
                        <span style={{ color: '#fff' }}> Edit This data</span>
                      </Link>
                    </Button>
                  </Form>
                </CardBody>
              </Col>
            </Card>
          </Row>
        </Container>
      </>
    )
  }
}

export default BusEdit
