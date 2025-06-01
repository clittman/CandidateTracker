import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCounts } from '../CandidateContext';

const AddCandidate = () => {
    const navigate = useNavigate();
    const {getCounts} = useCounts();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');

    const onClick = async () => {
        const candidate = { firstName, lastName, email, phoneNumber, notes, status: 'pending' };
        await axios.post('api/home/addcandidate', candidate);
        getCounts();
        navigate('/');
    }

    return <div style={{ marginTop: 80 }}>
        <div className="card card-body bg-light">
            <h5>Add Candidate</h5>
            <input type="text" placeholder="First Name" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <br />
            <input type="text" placeholder="Last Name" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
            <br />
            <input type="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            <br />
            <input type="text" placeholder="Phone Number" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            <br />
            <textarea rows="5" className="form-control" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
            <br />
            <button className="btn btn-primary" onClick={onClick}>Submit</button>
        </div>
    </div>
}

export default AddCandidate;