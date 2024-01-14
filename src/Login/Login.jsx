import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import vote from '../assets/vote.jpg';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      toast.error('Error logging in : Fields cannot be empty', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return;
    }

    fetch(import.meta.env.VITE_PUBLIC_URL + '/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        userName: email,
        password: password
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((res) => res.json())
    .then((res) => {
      localStorage.setItem("votingUser", JSON.stringify(res.obj.user));
      localStorage.setItem("token", res.obj.token);
      if (res.status != 200) {
        toast.error('Invalid Credentials', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      } else {
        if (res.obj && res.obj.user && res.obj.user.role === 'ROLE_VOTER') {
          navigate("/vote");
        } else if (res.obj && res.obj.user && res.obj.user.role === 'ROLE_ADMIN'){
          navigate("/viewVoter")
        }
      }

    }).catch((e) => {
        toast.error('Error logging in', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
    })
  }
    return (
        <>
          <div className="d-flex" style={{height: '100%'}}>
            <div style={{minWidth: '46%', background: '#1a257d', height: '100%'}}>
                <img src={vote} height={'250px'} width={'300px'} style={{marginTop:'20%', marginLeft:'29%'}}></img>
                <p style={{color: 'white', textAlign: 'center', marginTop: '1%', fontSize: '26px', fontWeight: 'bold'}}>#IndiaForElections</p>
            </div>
            <div style={{maxWidth: '60%', marginLeft: '15%', marginTop: '10%', height: '100%', marginRight : '16%'}}>
              <Form>
                <h3 className="mb-4 heading" style={{fontWeight: '600'}}>Welcome to the Voting Booth</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{fontWeight: '500'}}>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
          
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{fontWeight: '500'}}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="button-style" onClick={(e) => login(e)}>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
      )
}

export default Login;