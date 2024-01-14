import { Button, Col, Form, Row } from "react-bootstrap";
import './AddVoter.css';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header/Header";
import registerVoterImg from '../assets/voter-registration.jpg';


function AddVoter() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [voterID, setVoterID] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const registerVoter = (e) => {
        e.preventDefault();
        if (email.length == 0 || name.length == 0 || phone.length == 0 || voterID.length == 0 || city.length == 0 || state.length == 0 || image.length == 0) {
            toast.error('Error adding voter : Fields cannot be empty', {
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
        fetch(import.meta.env.VITE_PUBLIC_URL + '/voter/createVoter', {
            method: 'POST',
            body: JSON.stringify({
                name,
                emailId: email,
                phone,
                voterId: voterID,
                city,
                state,
                image
            }),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then((res) => res.json())
        .then((res) => {
            if (res.status === 400) {
                toast.error('Error adding voter : ' + res.obj, {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                });
            } else if (res.status === 200) {
                toast.success('Successfully added voter', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
            }
        }).catch((e) => {
            toast.error('Error adding voter', {
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
            <Header />     
            <div className="d-flex" style={{height: '100%'}}>
                <div style={{minWidth: '46%', background: '#1a257d', height: '100%'}}>
                    <img src={registerVoterImg} height={'250px'} width={'500px'} style={{marginTop:'20%', marginLeft:'15%'}}></img>
                    <p style={{color: 'white', textAlign: 'center', marginTop: '1%', fontSize: '26px', fontWeight: 'bold'}}>#IndiaForElections</p>
                </div>
            <div style={{maxWidth: '60%', height: '100%', marginLeft : '11%'}}>   
                <Form className="nom-form">
                    <h3 className="text-center nom-heading mb-3" style={{fontWeight : '500'}}>Create Voter</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label style={{fontWeight : '500'}}>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label style={{fontWeight : '500'}}>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label style={{fontWeight : '500'}}>Phone Number</Form.Label>
                            <Form.Control required type="phone" placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridVoterID">
                            <Form.Label style={{fontWeight : '500'}}>Voter ID</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Voter ID" onChange={(e) => setVoterID(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label style={{fontWeight : '500'}}>City</Form.Label>
                            <Form.Control required type="text" placeholder="Enter city" onChange={(e) => setCity(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label style={{fontWeight : '500'}}>State</Form.Label>
                            <Form.Control required type="text" placeholder="Enter state" onChange={(e) => setState(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridImage">
                            <Form.Label style={{fontWeight : '500'}}>Image URL</Form.Label>
                            <Form.Control required type="text" placeholder="Enter image" onChange={(e) => setImage(e.target.value)}/>
                        </Form.Group>

                        
                    </Row>
                    <Button variant="primary" className="w-100" onClick={(e) => registerVoter(e)} >
                        Submit
                    </Button>
                </Form>
                    <ToastContainer
                        position="bottom-left"
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
            </div>
            </div>
        </>
    );
}
export default AddVoter;