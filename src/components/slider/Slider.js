import React, { useState } from 'react'
import styledComponents from 'styled-components'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { sliderItems } from '../../data';

const Container = styledComponents.div`
width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden;
`;
const Slide = styledComponents.div`
  display:flex;
  align-items:center;
  width : 100vw;
  height:100vh;
  background-color:#${props=>props.bg}
`;
const ImageContainer = styledComponents.div`
  flex:1;
  height:100%;
`;

const Image = styledComponents.img`
height:80%;
width:65vw
`;


const InfoContainer = styledComponents.div`
  flex:1;
  padding : 50px;
`;

const Wrapper = styledComponents.div`
height: 100%;
display:flex;
transition:all 1.5s;
transform:translateX(${props=>props.slideIndex * -100}vw);
`;

const Arrow = styledComponents.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
opacity: 0.4;
left: ${(props)=>props.direction === "left" && "10px"};
right: ${(props)=>props.direction === "right" && "10px"};
z-index:2;
`;

const Title = styledComponents.h1`
font-size:78px;
`;
const Description = styledComponents.p`
margin:50px 0px;
font-size:20px;
font-weight:500;
letter-spacing:3px;
`;
const Button = styledComponents.button`
padding:10px;
font-size:20px;
background-color:transparent;
cursor:pointer;

`;


const Slider = () => {
  const [slideIndex, setSlideIndex] = useState()
  const handleClick = (direction) =>{
    if(direction ==="left"){
      setSlideIndex(slideIndex > 0 ? slideIndex-1:2)
    }else{
      setSlideIndex(slideIndex<2?slideIndex+1:0);
    }
  };
  return (
    <Container>
        <Arrow direction="left" onClick={()=> handleClick("left")}>
            <ArrowLeftIcon/>
            </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item)=>( 

            <Slide bg={item.bg} key = {item.id}>
            <ImageContainer>
              <Image  src={item.img}/>
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>Show Now</Button>
            </InfoContainer>
          </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=> handleClick("right")}>
            <ArrowRightIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider