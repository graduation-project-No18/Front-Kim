import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket,faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper=styled(motion.nav)`
    position:fixed;
    z-index: 1000;
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
`

const HeaderLogo=styled(motion.div)`
    width:67%;
    font-size:30px;
    color:${props=>props.theme.white.lighter};
    font-weight:600;
    span{
        &:hover{
        cursor:pointer;
        }
    }
`

const HeaderButton=styled(motion.div)`
    width:13%;
    display:flex;
    justify-content:space-around;
    box-sizing:border-box;
`

const UserProfileBtn=styled.div`
    position:relative;
    font-size:18px;
    color:${props=>props.theme.white.darker};
    &:hover{
        cursor:pointer;
    };
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    font-size:30px;
    background:linear-gradient(blue,red);
    border-radius: 50%;
    width:50px;
    height:50px;
`

const LogoutBtn=styled.div`
    position:relative;
    font-size:18px;
    color:${props=>props.theme.white.darker};
    &:hover{
        cursor:pointer;
        color:${props=>props.theme.black.lighter};
        transition:all 0.2s ease-in-out;
    };
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    font-size:30px;
`

const UserProfileDetail=styled(motion.div)`
    width:150px;
    height:100px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.88) 100%);
    position: absolute;
    top:60px;
    border-radius:10px;
`

const UserProfileDetailList=styled.div`
    width:100%;
    height:50%;
    color:${props=>props.theme.white.darker};
    font-size:20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const UserProfileVariants:Variants={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.8
        }
    },
    exit:{
        opacity:0
    }
}

function DetailHeader(){
    const navigate=useNavigate();
    const [onProfile,setOnProfiile]=useState(false);
    const onUserProfileBtn=()=>{
        setOnProfiile(prev=>!prev);
    }
    const LeaveUserProfileBtn=()=>{
        setOnProfiile(prev=>!prev);
    }
    const EditProfileClicked=()=>{
        navigate('/main/editprofile');
    }
    const MySongClicked=()=>{
        navigate('/main/mysong');
    }
    const logoClicked=()=>{
        navigate('/main');
    }
    const handleDragStart=()=>{
        console.log("dragged");
    }
    return <HeaderWrapper>
        <HeaderLogo>
            <span onClick={logoClicked}>NO18</span>
        </HeaderLogo>
        <HeaderButton>
            <UserProfileBtn onMouseEnter={onUserProfileBtn} onMouseLeave={LeaveUserProfileBtn}>
                <span><FontAwesomeIcon icon={faUser} /></span>
                <AnimatePresence>{onProfile ? <UserProfileDetail 
                variants={UserProfileVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                >
                <UserProfileDetailList onClick={EditProfileClicked}>
                    프로필 수정
                </UserProfileDetailList>
                <UserProfileDetailList onClick={MySongClicked}>
                    노래 저장소
                </UserProfileDetailList>
                </UserProfileDetail> : null}</AnimatePresence>
            </UserProfileBtn>
            <LogoutBtn>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </LogoutBtn>
        </HeaderButton>
    </HeaderWrapper>
}

export default DetailHeader;