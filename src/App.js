import './App.css';
import Header from './components/header';
import Home from './components/home';
import Add from './components/add';
import View from './components/view';
import { AuthProvider } from './components/usercontext';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Register from './components/registration';
import Login from './components/login';
import {PrivateRouter} from './components/privaterouter'
import {PublicRouter} from './components/publicrouter'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<PrivateRouter />}>
            <Route exact path="/" element={<Home/>}></Route>
          </Route>

          <Route exact path="/view" element={<PrivateRouter />}>
            <Route exact path="/view" element={<View/>}></Route>
          </Route>
          <Route exact path="/add" element={<PrivateRouter />}>
            <Route exact path="/add" element={<Add/>}></Route>
          </Route>     
          <Route exact path="/register"  element={<PublicRouter/>}>
              <Route exact path="/register" element={<Register/>}></Route>
         </Route>   
    
          <Route exact path="/login" element={<PublicRouter/>}>
             <Route exact path="/login" element={<Login/>}></Route>
          </Route>             
        </Routes>
        <div className="my-4 h-4 w-full"></div>
        <footer className="text-center bg-gray-400 text-white fixed bottom-0 w-full">
        &copy; Sultanulborhan
       </footer>       
    </div>
    </AuthProvider>
    </BrowserRouter>
  );
  
}

export default App;
