import React from 'react'
import styledComponents from 'styled-components';
import { useNavigate } from "react-router-dom";


const Container = styledComponents.div`
    height: 30px;
    background-color:teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    
`

const Announcement = () => {
  let navigate = useNavigate();
 
  const Product = ()=>{
    navigate("/pages/ProductList")
  }
  return (
    <Container onClick={Product}>
        SUPER DEAL ON ELECTRONICS
    </Container>
  )
}

export default Announcement