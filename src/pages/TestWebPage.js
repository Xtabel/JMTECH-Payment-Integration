import React,{useState} from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';



const TestWebPage = () =>{
    
   const {search} = useLocation();
   const searchParams = new URLSearchParams(search)
   const refcode = searchParams.get('reference')
   const [items, setItems] = useState([]);

    return(
        <div>
        {refcode}
        </div>
    )      

}

export default TestWebPage;