import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import TodoList from "./component/TodoList";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Header from "./component/Header";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/todo" element={<ProtectedRoute>
            <TodoList/>
          </ProtectedRoute>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
