import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket,faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { accessToken } from "../recoil";

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
    width:60%;
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
    width:20%;
    display:flex;
    justify-content:space-around;
    box-sizing:border-box;
`

const MicroPhoneBtn=styled.div`
    position:relative;
    font-size:18px;
    color:${props=>props.theme.white.darker};
    &:hover{
        cursor:pointer;
        color:${props=>props.theme.black.lighter};
        scale:1.3;
        transition:all 0.2s ease-in-out;
    };
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    font-size:30px;
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

function MainHeader(){
    const navigate=useNavigate();
    const [onProfile,setOnProfiile]=useState(false);
    const [token,setToken]=useRecoilState(accessToken);
    const onUserProfileBtn=()=>{
        setOnProfiile(prev=>!prev);
    }
    const LeaveUserProfileBtn=()=>{
        setOnProfiile(prev=>!prev);
    }
    const EditProfileClicked=()=>{
        navigate('editprofile');
    }
    const MySongClicked=()=>{
        navigate('mysong');
    }
    const logoClicked=()=>{
        navigate('/main');
    }
    const handleDragStart=()=>{
        console.log("dragged");
    }
    const logoutBtn=()=>{
        let answer = window.confirm("로그아웃 하시겠습니까?");
        if(answer){
            setToken(null);
            localStorage.removeItem('accessToken');
            navigate('/');
        }
    }
    return <HeaderWrapper>
        <HeaderLogo>
            <span onClick={logoClicked}>NO18</span>
        </HeaderLogo>
        <HeaderButton>
            <MicroPhoneBtn draggable="true" onDragStart={handleDragStart}>
                <FontAwesomeIcon icon={faMicrophone} />
            </MicroPhoneBtn>
            <UserProfileBtn onMouseEnter={onUserProfileBtn} onMouseLeave={LeaveUserProfileBtn}>
                <span><FontAwesomeIcon icon={faUser} /></span>
                <AnimatePresence>{onProfile ? <UserProfileDetail 
                variants={UserProfileVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                >
                <UserProfileDetailList onClick={EditProfileClicked}>
                    내 프로필
                </UserProfileDetailList>
                <UserProfileDetailList onClick={MySongClicked}>
                    노래 저장소
                </UserProfileDetailList>
                </UserProfileDetail> : null}</AnimatePresence>
            </UserProfileBtn>
            <LogoutBtn onClick={logoutBtn}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </LogoutBtn>
        </HeaderButton>
    </HeaderWrapper>
}

export default MainHeader;