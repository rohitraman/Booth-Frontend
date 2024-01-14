import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import AddVoter from './AddVoter/AddVoter';
import VotingPage from './VotingPage/VotingPage';
import ViewVoter from './ViewVoter/ViewVoter';

function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/addVoter' element={<AddVoter />} />
            <Route path='/vote' element={<VotingPage />} />
            <Route path='/viewVoter' element={<ViewVoter />} />
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default App
