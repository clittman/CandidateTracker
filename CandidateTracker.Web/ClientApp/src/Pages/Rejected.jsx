import axios from "axios";
import { useState, useEffect } from "react";
import CandidateRow from "../components/CandidateRow";

const Rejected = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const setState = async () => {
            const { data } = await axios.get('/api/home/getcandidates?status=rejected');
            setCandidates(data);
        }
        setState()
    }, [])

    return <div className="container" style={{ marginTop: 80 }}>
        <h3>Rejected</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {candidates.map(c => <CandidateRow key={c.id} candidate={c} />)}
            </tbody>
        </table>
    </div>
}

export default Rejected;