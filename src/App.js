import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { Provider } from 'react-redux'
import Dashboard from './pages/Dashboard';
import AddJob from './pages/dashboard/AddJob';
import AllJobs from './pages/dashboard/AllJobs';
import Profile from './pages/dashboard/Profile';
import Stats from './pages/dashboard/Stats';
import SharedLayout from './pages/dashboard/SharedLayout';
import ProtectedRoute from './pages/ProtectedRoute';


// AddJob,AllJobs,Profile,Stats,SharedLayout

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/landing' index Component={Landing} />
          <Route path='/login' Component={Login} />
          <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
            }>
            <Route index Component={Stats} />
            <Route path='add-job' Component={AddJob} />
            <Route path='all-jobs' Component={AllJobs} />
            <Route path='profile' Component={Profile} />
          </Route>
          <Route path='*' Component={Error} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
