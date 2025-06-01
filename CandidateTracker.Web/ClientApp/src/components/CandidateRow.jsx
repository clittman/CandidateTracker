import { Link } from "react-router-dom";

const CandidateRow = (props) => {
    const { candidate } = props;
    const {id, firstName, lastName, email, phoneNumber, notes, status} = candidate;
    
    return <tr>
        {status === 'Pending' ? <td><Link to={`/details/${id}`}>View Details</Link></td> : ''}
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <td>{notes}</td>
    </tr>
}

export default CandidateRow;