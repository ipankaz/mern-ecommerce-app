import React, { useState } from "react";
import { Container, Row, Col ,Form,Button} from "react-bootstrap";
import Layout from '../../components/layout/index'
import Input from '../../components/UI/Input/index'
import authAction from '../../actions/auth.action'
import { useDispatch , useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'
/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

   if(auth.authenticate){
    return <Redirect to='/'/>
  }
  
    const user={
    email,
     password
  }

  function Signin(event){
    event.preventDefault()
    
    dispatch(authAction(user));
  
  }

  return (
    <Layout>
        <Container>
      <Row style={{marginTop:"50px"}}>
        <Col md={{span:6,offset:3}}>
          <Form onSubmit={Signin}>
          <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your Email"
                    message="We'll never share your email with anyone else."
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    />
              <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
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
