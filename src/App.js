import './App.css';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom'
 import Posts from './Components/Posts';
import SinglePost from './Components/SinglePost';
import Error from './Components/Error';
  import {Navbar} from 'react-bootstrap'
  import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="ms-2" href="/">
      React Bootstrap
      </Navbar.Brand>
    </Navbar>  
     <Router>
       <Routes>
         <Route exact path="/" element={<Posts />}/>
         <Route path="/posts/:index" children={SinglePost} element={<SinglePost />}  />
         <Route path="/*" element={<Error/>} />
         
       </Routes>
     </Router>
    </div>
  );
}

export default App;
