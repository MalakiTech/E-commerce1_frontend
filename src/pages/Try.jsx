import axios from "axios";
import { useEffect,useState } from "react";


export default function Try() {


    const [product,setProducts]=useState([])

 useEffect(()=>{
        axios
        .get("http://127.0.0.1:8000/products/")
        .then(response=>{console.log(response.data);
            setProducts(response.data.results);
        })
        .catch(error=>{console.log(error);});
        
    },[]); 



  return(
    <div>
    <div>
      {Array.isArray(product) && product.map((produc)=>(
        <div key={produc.id}>
          <h2>{produc.name}</h2>
          <p>ppppp</p>
        </div>
      ))} </div>


    hhhhhh
    
    </div>
  );
  
};

    
