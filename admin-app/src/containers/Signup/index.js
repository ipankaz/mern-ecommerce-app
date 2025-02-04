import React , {useEffect, useState} from "react";
import {Container,Form,Row,Col,Button} from 'react-bootstrap'
import Layout from '../../components/layout/index'
import Input from '../../components/UI/Input/index'
import {  useSelector,useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom'
import {signup} from '../../actions/user.action'

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {

  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  //const [error , seterror] = useState("")
  const auth = useSelector(state=>state.auth)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!user.loading){
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    }
  },[user.loading])

   const userSignup = (event)=>{
    event.preventDefault()
    
    const user = {
      firstName : firstName ,
      lastName:lastName,
      email:email,
      password:password
    }

    dispatch(signup(user))
  }

   if(auth.authenticate){
    return <Redirect to='/'/>
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }
  // if (user.done) {
    
  // }

  return (
    <Layout action={"signup"}>
      <Container>
        {user.message}
        <Row style={{ marginTop: "180px" }}>
          <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
