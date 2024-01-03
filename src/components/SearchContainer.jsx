import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer';
import { clearFilters, handleChange } from '../feature/job/allJobsSlice';

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(handleChange({name: e.target.name, value: e.target.value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>Tìm kiếm</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="search" className="form-label">Từ khóa</label>
            <input onChange={handleSearch} value={search} type="text" className="form-input" id="search" name="search" />
          </div>
          <div className="form-row">
            <label htmlFor="searchStatus" className="form-label">Trạng thái</label>
            <select onChange={handleSearch} value={searchStatus} name="searchStatus" id="searchStatus" className="form-select">
              <option value="all">all</option>
              {statusOptions.map((status, index) =>
              (<option key={index} value={status}>
                {status}
              </option>)
              )}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="searchType" className="form-label">Loại</label>
            <select onChange={handleSearch} value={searchType} name="searchType" id="searchType" className="form-select">
              <option value="all">all</option>
              {jobTypeOptions.map((type, index) =>
              (<option key={index} value={type}>
                {type}
              </option>)
              )}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="sort" className="form-label">Sắp xếp</label>
            <select onChange={handleSearch} value={sort} name="sort" id="sort" className="form-select">

              {sortOptions.map((sort, index) =>
              (<option key={index} value={sort}>
                {sort}
              </option>)
              )}
            </select>
          </div>
          <button type='button' className="btn btn-block btn-danger" disabled={isLoading} onClick={() => dispatch(clearFilters())}>Hủy</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer