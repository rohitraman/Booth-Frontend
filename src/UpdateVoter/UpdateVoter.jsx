import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function UpdateVoter(props) {
    const voter = props.voter;
    const [email, setEmail] = useState(voter.emailId);
    const [name, setName] = useState(voter.name);
    const [phone, setPhone] = useState(voter.phone);
    const [voterID, setVoterID] = useState(voter.voterId);
    const [city, setCity] = useState(voter.city);
    const [state, setState] = useState(voter.state);
    const [image, setImage] = useState(voter.image);
    const handleUpdate = (e) => {
        e.preventDefault();
        if ((email != undefined && email.length == 0) || (name != undefined && name.length == 0) || (phone != undefined && phone.length == 0) || (voterID != undefined && voterID.length == 0) || (city != undefined && city.length == 0) || (state != undefined && state.length == 0) || (image != undefined && image.length == 0)) {
            toast.error('Error updating voter : Fields cannot be empty', {
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
        const obj = {
            emailId : email ? email : "",
            name : name ? name : "",
            phone : phone ? phone : "",
            voterId : voterID ? voterID : "",
            city : city ? city : "",
            state : state ? state : "",
            image : image ? image : ""
        };
            fetch(import.meta.env.VITE_PUBLIC_URL + "/voter/updateVoter?voterId=" + voter.id, {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                },
                body : JSON.stringify(obj),
                method : 'PUT'
            }).then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    props.setVoters(res.obj);
                    props.handleClose();
                    toast.success('Successfully updated voter', {
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
                    toast.error('Error deleting voter', {
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
                toast.error('Error deleting voter', {
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
            <Modal show={props.showUpdate} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Updating {voter.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label style={{fontWeight : '500'}}>Name</Form.Label>
                                <Form.Control defaultValue={voter.name} type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{fontWeight : '500'}}>Email</Form.Label>
                                <Form.Control defaultValue={voter.emailId} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label style={{fontWeight : '500'}}>Phone Number</Form.Label>
                                <Form.Control defaultValue={voter.phone} type="phone" placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridVoterID">
                                <Form.Label style={{fontWeight : '500'}}>Voter ID</Form.Label>
                                <Form.Control defaultValue={voter.voterId} type="text" placeholder="Enter Voter ID" onChange={(e) => setVoterID(e.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label style={{fontWeight : '500'}}>City</Form.Label>
                                <Form.Control defaultValue={voter.city} type="text" placeholder="Enter city" onChange={(e) => setCity(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label style={{fontWeight : '500'}}>State</Form.Label>
                                <Form.Control defaultValue={voter.state} type="text" placeholder="Enter state" onChange={(e) => setState(e.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridImage">
                                <Form.Label style={{fontWeight : '500'}}>Image URL</Form.Label>
                                <Form.Control defaultValue={voter.image} type="text" placeholder="Enter image" onChange={(e) => setImage(e.target.value)}/>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="danger" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type="submit" onClick={(e) => handleUpdate(e)}>
                            Update
                        </Button>

                </Modal.Footer>
            </Modal>
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
        </>
    );
}

export default UpdateVoter;