import React from "react";
import { Container, Row, Col ,Form,Button} from "react-bootstrap";
import Layout from '../../components/layout/index'
import Input from '../../components/UI/Input/index'
/**
 * @author
 * @function Signup
 **/

const Signin = (props) => {
  return (
    <Layout>
        <Container>
      <Row style={{marginTop:"50px"}}>
        <Col md={{span:6,offset:3}}>
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

export default Signin;
