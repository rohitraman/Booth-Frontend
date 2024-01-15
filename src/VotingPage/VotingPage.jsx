import { Button, Modal, Table } from "react-bootstrap";
import './VotingPage.css'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header/Header";

function VotingPage() {
    const [show, setShow] = useState(false);
    const [nomineeChosen, setNomineeChosen] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const modalShow = (val) => {
        handleShow();
        setNomineeChosen(val);
    }
    const user = JSON.parse(localStorage.getItem("votingUser"));
    const handleVoting = () => {
        const voteObj = {
            name: user.name,
            emailId: user.emailId,
            phone: user.phone,
            voterId: user.voterId,
            candidateId: nomineeChosen.id  
        }
        fetch(import.meta.env.VITE_PUBLIC_URL + '/voter/castVote', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(voteObj)
        }).then((res) => res.json())
        .then((res) => {
            if (res.status === 400) {
                toast.error('You have already voted', {
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
                toast.success('You have successfully voted', {
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
            handleClose();
        }).catch((e) => {
            toast.error('Error voting', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
         handleClose();
        })
    }
    const [nominees, setNominees] = useState([])
    useEffect(() => {
        // Change ID
        fetch(import.meta.env.VITE_PUBLIC_URL + "/voter/getNomineesByCity?city=" + import.meta.env.VITE_CITY + "&id=" + user.emailId, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then((res) => res.json())
        .then((res) => {
            setNominees(res.obj);
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    return (
        <>
            <Header />
            <div className="vote-form">
                <h2 className="vote-heading mb-5">Time to Vote!</h2>
                <Table borderless>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        nominees && nominees.map((val, i) => {
                            return(
                            <tr>
                                <td>{val.id}</td>
                                <td>
                                    <img src={val.image} width="60px" height="60px" />
                                </td>
                                <td>{val.name}</td>
                                <td>{val.party}</td>
                                <td>{val.city}</td>
                                <td>{val.state}</td>
                                <td>
                                    <Button type="button" variant="success" onClick={() => modalShow(val)}>Vote</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
            </Table>
            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Voting for {nomineeChosen.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to vote for {nomineeChosen.name}? You can only vote once.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleVoting()}>
                        Vote
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
            </div>
        </>
    )
}

export default VotingPage;