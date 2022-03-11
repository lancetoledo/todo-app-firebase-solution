import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { Dashboard }  from './pages/Dashboard';
import { SignIn }  from './pages/SignIn';
import { SignUp }  from './pages/SignUp';

function App() {

  return (
    // Main router that allows the routes to connect and work
    <BrowserRouter>
      <div className="App">
        {/* Makes sure only ONE route shows at any one time */}
        <Routes>
          {/* At the path load the page jsx */}
          <Route path = "/dashboard" element= {<Dashboard/>} />
          <Route path = "/" element= {<SignIn/>} />
          <Route path = "/signup" element= {<SignUp/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
