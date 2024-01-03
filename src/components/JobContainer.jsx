import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job';
import Loading from './Loading';
import { getAllJobs } from '../feature/job/allJobsSlice';
import { ToastContainer } from 'react-toastify';
import PageButtonContainer from './PageButtonContainer';

const JobContainer = () => {
    const { jobs, isLoading, page, totalJobs, numOfPages, search, searchStatus, searchType, sort} = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllJobs())
    },[page, search, searchStatus, searchType, sort])
    if(isLoading) {
        return (
            <Loading center/>
        )
    }
    if(jobs.length == 0) {
        return (
            <Wrapper>
                <h2>Không có công việc để hiển thị...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>

            <h5>Có {totalJobs} công việc</h5>
            <div className='jobs'>
                {
                    jobs.map((job)=> {
                        return (<Job key={job._id} {...job}/>)
                        
                    })
                }
            </div>
            {numOfPages > 1 && <PageButtonContainer/>}
        </Wrapper>
    )
}

export default JobContainer