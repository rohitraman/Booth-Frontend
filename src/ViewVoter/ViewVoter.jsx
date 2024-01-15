import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import './ViewVoter.css';
import Header from "../Header/Header";
import trash from '../assets/trash.png'
import UpdateVoter from "../UpdateVoter/UpdateVoter";
import update from '../assets/update.png'
import { ToastContainer, toast } from "react-toastify";

function ViewVoter() {
    const [voters, setVoters] = useState([]);
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [voterChosen, setVoterChosen] = useState({});
    useEffect(() => {
        fetch(import.meta.env.VITE_PUBLIC_URL + "/voter/viewVoters", {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then((res) => res.json())
        .then((res) => {
            setVoters(res.obj)
        })
    },[]);
    const handleDelete = () => {
        fetch(import.meta.env.VITE_PUBLIC_URL + '/voter/deleteVoter?voterId=' + voterChosen.emailId, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            },
            method: 'DELETE'
        } ).then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.status === 200) {
                setVoters(res.obj);
                handleClose();
                toast.success('Successfully deleted voter', {
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const modalShow = (val) => {
        handleShow();
        setVoterChosen(val);
    }
    const updateModalShow = (val) => {
        setShowUpdate(true);
        setVoterChosen(val)
    }
    return (
        <>
            <Header />
            <div className="table-style">
                <h2 className="view-nom-heading text-center" style={{fontWeight : '500'}}>View Voters</h2>    
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Voter ID</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Has Voted?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voters && voters.length > 0 && voters.map((val, i) => {
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>
                                            <img src={val.image} width="50px" height="50px" />
                                        </td>
                                        <td>{val.name}</td>
                                        <td>{val.emailId}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.voterId}</td>
                                        <td>{val.city}</td>
                                        <td>{val.state}</td>
                                        <td>
                                            {val.voted ? "Yes" : "No"}
                                        </td>
                                        <td >
                                            <Button variant="success" className='btn-delete' onClick={() => updateModalShow(val)}>
                                                <img src={update} width={'20px'} height={'20px'} />
                                            </Button>
                                            <Button disabled = {val.voted} className='btn-delete' variant="danger" onClick={() => modalShow(val)}>
                                                <img src={trash} width={'20px'} height={'20px'} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Deleting {voterChosen.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete voter {voterChosen.name}?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleDelete}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
                <UpdateVoter showUpdate={showUpdate} handleClose={() => setShowUpdate(false)} voter={voterChosen} setVoters={setVoters}/>
            </div>    
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
    )
}

export default ViewVoter;