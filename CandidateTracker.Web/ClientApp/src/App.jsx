import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddCandidate from './Pages/AddCandidate';
import CandidateContextComponent from './CandidateContext';
import Pending from './Pages/Pending';
import Confirmed from './Pages/Confirmed';
import Rejected from './Pages/Rejected';
import Details from './Pages/Details';

const App = () => {
    return (
        <CandidateContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/addcandidate' element={<AddCandidate />} />
                    <Route path='/pending' element={<Pending />} />
                    <Route path='/confirmed' element={<Confirmed />} />
                    <Route path='/rejected' element={<Rejected />} />
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </Layout>
        </CandidateContextComponent>
    );
}

export default App;