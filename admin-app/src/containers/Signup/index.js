import React from "react";
import {Container,Form,Row,Col,Button} from 'react-bootstrap'
import Layout from '../../components/layout/index'
import Input from '../../components/UI/Input/index'
import {  useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const auth = useSelector(state=>state.auth)
  if(auth.authenticate){
    return <Redirect to='/'/>
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
              <Form>
                  <Row>
                      <Col>
                    <Input
                    type="text"
                    label="First Name"
                    placeholder="First Name"
                    value=""
                    onChange={()=>{}}
                    
                    />
                      </Col>
                      <Col>
                      <Input
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    value=""
                    onChange={()=>{}}
                    />
                      </Col>
                  </Row>
              </Form>
            <Form>
              
              <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your Email"
                    message="We'll never share your email with anyone else."
                    value=""
                    onChange={()=>{}}
                    />
              <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your Password"
                    value=""
                    onChange={()=>{}}
                    />
              

              

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
