import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../feature/job/allJobsSlice";
import StatsContainer from "../../components/StatsContainer";
import ChartContainer from "../../components/ChartContainer";

const Stats = () => {
    const {isLoading, monthlyApplications} = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showStats())
    }, [])
    return (
        <>
            <StatsContainer/>
            {monthlyApplications.length > 0 && <ChartContainer/>}
        </>
    )
}
export default Stats;