import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { clearValues, createJob, handleChange, updateJob } from "../../feature/job/jobSlice";
const AddJob = () => {
    const { isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId
    } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !company || !jobLocation || !status || !jobType) {
            toast.error('vui lòng nhập đủ trường!');
            return
        }
        if (isEditing) {
            dispatch(updateJob({
                jobId: editJobId,
                job: { position, company, jobLocation, jobType, status }
            }))
            return;
        }
        dispatch(createJob({ position, company, jobLocation, status, jobType }))
    }
    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }));
    };
    useEffect(() => {
        if (!isEditing) {
            dispatch(
                handleChange({
                    name: 'jobLocation',
                    value: user.location,
                })
            );
        }
    }, []);

    return (
        <Wrapper>
            <h1>{isEditing ? 'Edit Job' : 'Add Job'}</h1>
            <ToastContainer />
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="position" className="form-label">position</label>
                        <input onChange={handleJobInput} value={position} type="text" className="form-input" id="position" name="position" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="company" className="form-label">company</label>
                        <input onChange={handleJobInput} value={company} type="text" className="form-input" id="company" name="company" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="jobLocation" className="form-label">job Location</label>
                        <input onChange={handleJobInput} value={jobLocation} type="text" className="form-input" id="jobLocation" name="jobLocation" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="status" className="form-label">status</label>
                        <select onChange={handleJobInput} value={status} name="status" id="status" className="form-select">
                            {statusOptions.map((job, index) =>
                            (<option key={index} value={job}>
                                {job}
                            </option>)
                            )}
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="jobType" className="form-label">Job Type</label>
                        <select onChange={handleJobInput} value={jobType} name="jobType" id="jobType" className="form-select">
                            {jobTypeOptions.map((job, index) =>
                            (<option key={index} value={job}>
                                {job}
                            </option>)
                            )}
                        </select>
                    </div>
                    <div className="btn-container">
                        <button type="button" className="btn btn-block clear-btn" onClick={() => dispatch(clearValues())}>Cancel</button>
                        <button type="submit" className="btn btn-block submit-btn" disabled={isLoading}>Submit</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}
export default AddJob;