import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CandidateContext = createContext();

const CandidateContextComponent = (props) => {

    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const getCounts = async () => {
        const { data } = await axios.get('/api/home/getcounts');
        setPendingCount(data.pending);
        setConfirmedCount(data.confirmed);
        setRejectedCount(data.rejected)
    }
    useEffect(() => {
        getCounts();
    }, []);

    const contextValues = {
        pendingCount,
        confirmedCount,
        rejectedCount,
        getCounts
    }

    return (
        <CandidateContext.Provider value={contextValues}>
            {props.children}
        </CandidateContext.Provider>
    )
}

const useCounts = () => {
    return useContext(CandidateContext);
}

export default CandidateContextComponent;
export { useCounts };