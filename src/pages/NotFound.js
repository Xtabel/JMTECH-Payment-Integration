import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../assets/404.png';
class NotFoundPage extends React.Component{
    render(){
        return (
            <>
            <div style={{display:'flex', justifyContent:'center'}}>
            <img  style={{width:'500px', height:'auto'}}src={errorImg} alt="Page Not Found"/>
          </div>

           <p style={{textAlign:"center", }}>
           <Link  style={{color:'blue', fontSize:'30px'}}to="/">Go to Home </Link>
         </p>
            </>
        
        );
    }
}
export default NotFoundPage;