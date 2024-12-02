import './App.css';
import { Login } from './user_components/Login';
import { Signup } from './user_components/Signup';
import { AuthProvider } from "./AuthContext";
import { EmployeeList } from './EmployeeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ViewById } from './employee_components/ViewById';
import { AddEmployee } from './employee_components/AddEmployee';
import { UpdateEmployee } from './employee_components/UpdateEmployee';
import ProtectedRoute from './ProtectedRoute';
import 'bulma/css/bulma.min.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/employeelist"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <ProtectedRoute>
                <ViewById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/AddEmployee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id/UpdateEmployee"
            element={
              <ProtectedRoute>
                <UpdateEmployee />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<h1 className="has-text-centered">404: Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
