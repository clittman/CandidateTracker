import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCounts } from '../CandidateContext';

const Details = () => {
    const { id } = useParams();
    const { getCounts } = useCounts();
    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        status: '',
        notes: ''
    });

    useEffect(() => {
        const setState = async () => {
            const { data } = await axios.get(`/api/home/getdetails?id=${id}`);
            setCandidate(data);
        }
        setState();
    }, [])

    const onClick = async (status) => {
        await axios.post('/api/home/updatestatus', { status, id })
        getCounts();
        navigate('/')
    }

    return <div className="col-md-6 offset-md-3 card card-body bg-light" style={{ marginTop: 150 }}>
        <h4>Name: {candidate.firstName} {candidate.lastName}</h4>
        <h4>Email: {candidate.email}</h4>
        <h4>Phone: {candidate.phoneNumber}</h4>
        <h4>Status: {candidate.status}</h4>
        <h4>Notes:</h4>
        <p>{candidate.notes}</p>
        <button className="btn btn-primary" onClick={() => onClick('confirmed')}>Confirm</button>
        <button className="btn btn-danger" onClick={() => onClick('rejected')}>Refuse</button>
    </div>


}

export default Details;