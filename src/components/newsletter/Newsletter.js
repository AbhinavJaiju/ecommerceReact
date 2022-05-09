import SendIcon from '@mui/icons-material/Send';
import React from 'react'
import styledComponents from 'styled-components'

const Container = styledComponents.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styledComponents.h1`
    font-size:70px;
    margin-bottom:20px;

`;

const Description = styledComponents.div`
    font-size:20x;
    font-weight:300;
    margin-bottom:20px;
`;

const InputContainer = styledComponents.div`
    width:50%;
    height:40px;
    background-color:white;
    display:flex;
    justify-content:space-between;
    border:1px solid lightgray;
`;

const Input = styledComponents.input`
border:none;
flex:8;
`;

const Button = styledComponents.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;


function Newsletter() {
  return (
    <Container className='newsletter-component'>
        <Title>Newsletter</Title>
        <Description> Get timely updates from your favourite products.</Description>
        <InputContainer>
            <Input  placeholder="Your email"/>
            <Button>
                <SendIcon/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter