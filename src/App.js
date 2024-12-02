import React, { Suspense, lazy } from 'react';
import './App.css';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import 'bulma/css/bulma.min.css';

// Lazy-loaded components
const Login = lazy(() => import('./user_components/Login'));
const Signup = lazy(() => import('./user_components/Signup'));
const EmployeeList = lazy(() => import('./EmployeeList'));
const ViewById = lazy(() => import('./employee_components/ViewById'));
const AddEmployee = lazy(() => import('./employee_components/AddEmployee'));
const UpdateEmployee = lazy(() => import('./employee_components/UpdateEmployee'));

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error('Error occurred:', error);
    return <h1 className="has-text-danger">An error occurred. Please try again later.</h1>;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="has-text-centered">Loading...</div>}>
          <ErrorBoundary>
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
              <Route
                path="*"
                element={
                  <div className="has-text-centered">
                    <h1>404: Page Not Found</h1>
                    <Link to="/" className="button is-link">
                      Go to Home
                    </Link>
                  </div>
                }
              />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
