import './styles/App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <>
        <div className="App">

            <header className="App-header">
                <p>
                    Welcome to Student Course System
                </p>
                <div>
                    <nav>
                        <Link to="/login"> Login </Link>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        {/*<Route path="/manage-course" element={<ProtectedRoute><ManageCourse /></ProtectedRoute>} />*/}
                    </Routes>
                </div>

            </header>
        </div>
      </>
  );
}

export default App;
