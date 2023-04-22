import { BrowserRouter, Routes, Route} from 'react-router-dom';
import DataTable from "./pages/table";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import './App.css'


function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<DataTable/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
                  <Route path='/signin' element={<SignIn/>}/>
              </Routes>
          </BrowserRouter>
      );
}

export default App;