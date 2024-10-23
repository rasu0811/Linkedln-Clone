import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Components/Login'
import './App.css';
import Header from './Components/Header.js'
import Home from './Components/Home.js'
import { useEffect } from 'react';
import { getUserAuth } from './actions'
import {connect} from 'react-redux'



function App(props) {
useEffect(()=>{
  props.getUserAuth();
},[props]);


  
  return (
    <div className="App">
      
       <Router>
        
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
          <>
            <Header/>
            <Home/>
            </>
            
            }/>
            
          
          
          </Routes>
        
       </Router>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return{};
};
const  mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
