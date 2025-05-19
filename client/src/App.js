import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignIn from './pages/SignIn';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard"
import ProjectDetail from './pages/ProjectDetail';
import TeamManagement from './pages/TeamManagement';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import TeamDetail from './pages/TeamDetail';
import Reports from './pages/Reports';
import ProjectView from './pages/ProjectView';
import TaskManagement from './pages/TaskManagement';
import TeamForm from './pages/TeamForm';
import TaskDetail from './pages/TaskDetail';
import ProtectedRoute from './components/authentication/ProtectedRoute';



function App() {

  return (
    <>
      <Router>
      <Toaster
  position="top-right"
  containerClassName="text-nowrap"
  toastOptions={{
    duration: 1800
  }}
/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signIn' element={<SignIn />}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/teams' element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
          <Route path='/teams/:teamName' element={<ProtectedRoute><TeamDetail /></ProtectedRoute>} />
          <Route path='/project/:projectId/tasks' element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>}/>
          <Route path='/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>}/>
          <Route path='/projects' element={<ProtectedRoute><ProjectView /></ProtectedRoute>} />
          <Route path='/tasks' element={<ProtectedRoute><TaskManagement /></ProtectedRoute>} />
          <Route path='/teamForm' element={<ProtectedRoute><TeamForm /></ProtectedRoute>}/>
          <Route path='/tasks/:taskId' element={<ProtectedRoute><TaskDetail /></ProtectedRoute>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
