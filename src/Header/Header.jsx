import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import hamburger from '../assets/hamburger.png';
import election from '../assets/logo.jpg';
import logout from '../assets/logout.png';
import arrow from '../assets/arrow.png';
import add from '../assets/add.png';
import view from '../assets/view.png';
import './Header.css';

function Header() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const votingUser = JSON.parse(localStorage.getItem("votingUser"));
  return (
    <>
      <Navbar className="bg-header" style={{background: 'black'}}>
        <div className='container-fluid' >
          <Navbar.Brand style={{color: 'white', width: '100%'}}>
          {votingUser.role === 'ROLE_ADMIN' && <img src={hamburger} height={'25px'} width={'25px'} onClick={handleShow} style={{cursor: 'pointer'}}/>}
            <span style={{marginLeft: votingUser.role === 'ROLE_ADMIN' ? '47%' : '49%'}}>
                <img src={election} height={'35px'} width={'35px'}/>
            </span>
            <img src={logout} height={'20px'} width={'20px'} style={{marginLeft: votingUser.role === 'ROLE_ADMIN' ? '49%' : '48.6%', cursor: 'pointer'}} onClick={() => {
                    localStorage.removeItem("votingUser");
                    localStorage.removeItem("token");
                    navigate("/");
                }}/>
          </Navbar.Brand>
        </div>
      </Navbar>
      {votingUser.role === 'ROLE_ADMIN' && <Offcanvas show={show} onHide={handleClose} style={{width: '20%', background: '#fff9f9'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='mt-3'>
            <>
                <div className='btn-menu mb-4'>
                    <button class='button-style-header' onClick={() => {
                        navigate("/addVoter")
                    }}>
                        <img src={add} width={'15px'} height={'15px'} style={{marginLeft : '1%'}}/>
                        <span style={{marginLeft : '5%'}}>
                            Add Voters
                        </span>
                        <img src={arrow} width={'20px'} height={'20px'} style={{marginLeft : '38%'}}/>
                    </button>
                </div>
                <div className='btn-menu'>
                    <button class = 'button-style-header' onClick={() => {
                        navigate("/viewVoter")
                    }}>
                        <img src={view} width={'15px'} height={'15px'} style={{marginLeft : '1%'}}/>
                        <span style={{marginLeft : '5%'}}>
                            View Voters
                        </span>
                        <img src={arrow} width={'20px'} height={'20px'} style={{marginLeft : '38%'}}/>
                    </button>
                </div>
            </>
        </Offcanvas.Body>
      </Offcanvas>
    }   
    </>
  );
}

export default Header;