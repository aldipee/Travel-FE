import React, { Component } from 'react'
import Style from 'styled-components'
import { Container, Col, Form, FormGroup as FrmGroup, Label, Input, Button } from 'reactstrap'

const LoginPage = Style('body')`
background-color : #efefee;
height : 100vh
`
const LoginRow = Style('div')`
display: flex;
justify-content: center;
align-items: center;

`
const FormGroup = Style(FrmGroup)`
margin-bottom: 0; 

`
const WrapperLogin = Style(Col)`
background-color : #fff;
box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
border: 1px solid #ebecec;
padding: 60px 35px;
border-radius: 5px;
`
const Span = Style('span')`
display: flex;
justify-content: center;
align-items: center;
`

export default class Login extends Component {
  render() {
    return (
      <div>
        <LoginPage>
          <LoginRow>
            <Container>
              <WrapperLogin sm="12" md={{ size: 4, offset: 4 }} className="mt-5">
                <h3 className="text-center header-auth mb-3">Sign In To Admin</h3>
                <Form>
                  <FormGroup className="px-3">
                    <Label for="exampleEmail" className="label-form-display">
                      Username
                    </Label>
                    <Input />
                    {/* <FormFeedback valid>Sweet! that name is available</FormFeedback> */}
                  </FormGroup>
                  <FormGroup className="px-3 mt-3">
                    <Label for="examplePassword" className="label-form-display">
                      Password
                    </Label>
                    <Input />
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  </FormGroup>
                  <FormGroup className="px-3 mt-4 mb-5">
                    <Button className="px-4 py-2" color="primary">
                      Sign In
                    </Button>

                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  </FormGroup>
                </Form>
                <Span> Don't have an account yet ? Sign Up</Span>
              </WrapperLogin>
            </Container>
          </LoginRow>
        </LoginPage>
      </div>
    )
  }
}