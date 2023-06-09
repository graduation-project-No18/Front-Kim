import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { AboutWrapper } from "./About";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../axios";
import { axiosPublic } from "../axios";
import { user } from "../recoil";

const BeforeRecordArea=styled(motion.div)`
    width:50%;
    height:50%;
    background-color: ${props=>props.theme.black.lighter};
    opacity:0.85;
    border:2px dashed gray;

`

const BeforeRecordAreaText=styled.div`
    width:100%;
    height:100%;
    color:${props=>props.theme.white.lighter};
    font-size:40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RecordBoxVariants:Variants={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:1.5
        }
    },
    exit:{
        opacity:0,
        transition:{
            duration:0.8,
        }
    }
}

function Main(){
    const navigate=useNavigate();
    const memberId='16de3dcd-2fca-473e-8219-6632d8a011a5';
    const [areaClicked,setAreaClicked]=useState(false);
    const dropBox = useRef<HTMLDivElement>(null);
    const handleDragOver = (event:any) => {
        event.preventDefault();
        if(dropBox.current){
            dropBox.current.style.backgroundColor="#181818";
            dropBox.current.style.scale="1.03";
        }
    }
    const handleDragLeave = (event:any) => {
        event.preventDefault();
        if(dropBox.current){
            dropBox.current.style.backgroundColor="#2F2F2F";
            dropBox.current.style.scale="1";
        }
    }
    const handleDrop=(event:any)=>{
        event.preventDefault();
        setAreaClicked(prev=>!prev);
        setTimeout(()=>{
            navigate('record');
        },600);  
    }
    useEffect(()=>{
        axiosPrivate.get('http://3.37.47.43:8080/api/recording')
        .then(res=>console.log(res));
    },[])
    return <>
    <MainHeader />
    <AboutWrapper>
        <AnimatePresence>
            {!areaClicked ? <BeforeRecordArea 
            ref={dropBox}
            variants={RecordBoxVariants} 
            initial="initial" 
            animate="animate" 
            exit="exit"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
                <BeforeRecordAreaText>Drag Here!</BeforeRecordAreaText>
            </BeforeRecordArea> : null}
        </AnimatePresence>
    </AboutWrapper>
    </>
}

export default Main;