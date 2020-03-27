import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import config from '../../utils/config'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, UncontrolledTooltip } from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline } from '@mdi/js'

import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'

class Buses extends Component {
    static contextType = SchedulesContext
    state = {
        data: [],
        agents: []
    }
    loadAgents = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
        axios.get(config.DATA_URL.concat('agents')).then((data) => {
            let agents = data.data.data.map(dest => ({
                value: `${dest.agent_id}`,
                label: `${dest.agent_name} `
            }))
            this.setState({
                agents
            })
        })
    }

    selectAgent = e => {
        axios
            .get(config.DATA_URL.concat(`bus/${e.value}`))
            .then(data => {
                console.log(data)
                if (data.status === 200) {
                    this.setState({
                        data: data.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
        this.loadAgents()
    }

    render() {
        // Destract Destination Value

        return (
            <>
                <Layout>
                    <Container fluid={true}>
                        <p>
                            The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on
                            larger screens. When toggled using the Button below, the menu will change.
            </p>
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>All Schedules</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="12">
                                <Card body>
                                    <CardTitle>
                                        <Row>
                                            <Col sm="6">All Routes</Col>
                                            <Col sm="6" className="text-right">
                                                <Button onClick={this.context.openModal}>Add Routes</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="6">
                                                <Select
                                                    onChange={this.selectAgent}
                                                    name="agent"
                                                    options={this.state.agents}
                                                    isSearchable={true}
                                                    isClearable={true}

                                                />
                                            </Col>
                                            <Col sm="6">


                                            </Col>
                                        </Row>
                                    </CardTitle>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Bus Name</th>
                                                <th>Total Seat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data &&
                                                this.state.data.map((data, index) => (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {data && data.name}
                                                        </td>
                                                        <td> {data && data.total_seat}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>

                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
    }
}

export default Buses
