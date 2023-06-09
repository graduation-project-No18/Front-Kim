import styled from "styled-components";
import DetailHeader from "../components/DetailHeader";
import { AboutWrapper } from "./About";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { user } from "../recoil";
import { useRef } from "react";
import { axiosPrivate } from "../axios";
import { Variants, motion } from "framer-motion";
import {useState} from "react";
import SongBox from "../components/SongBox";
import { useLocation } from "react-router-dom";

const EditProfileArea=styled(motion.div)`
    width:80%;
    height:30%;
    display: flex;
`

const SavedSongArea=styled(motion.div)`
    width:100%;
    height:50%;
    display: flex;
    justify-content: center;
    display: flex;
    align-items: flex-end;
`

const ImgArea=styled.div`
    width:30%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const ProfileImg=styled.img`
    width: 200px;
    height:200px;
    border-radius:50%;
    margin-bottom: 20px;
`

const InputImg=styled.input`
    display:none;
`

const EditImg=styled.div`
    width:230px;
    height:35px;
    border-radius: 5px;
    background-color: ${props=>props.theme.black.lighter};
    position: absolute;
    bottom:35px;
    color:${props=>props.theme.white.veryDark};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:20px;
    &:hover{
        cursor: pointer;
        scale:1.05;
        background-color:${props=>props.theme.black.darker}
    }
`

const TextArea=styled.div`
    width:60%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
`

const NickName=styled.div`
    width:100%;
    height:25%;
    display: flex;
    align-items: center;
`

const Introduce=styled.div`
    width:100%;
    height:45%;
    display: flex;
`

const NickNameKey=styled.div`
    width:25%;
    height:100%;
    font-size:26px;
    color:${props=>props.theme.white.darker};
    display: flex;
    align-items: center;
    justify-content: center;
`

const NickNameValue=styled.input`
    width:75%;
    height:50%;
    background-color: ${props=>props.theme.black.lighter};
    border-radius: 12px;
    color:${props=>props.theme.white.lighter};
    font-size:22px;
    ::placeholder{
        color:${props=>props.theme.white.lighter};
    }
    display: flex;
    align-items:center;
`

const IntroduceKey=styled.div`
    width:25%;
    height:100%;
    font-size:26px;
    color:${props=>props.theme.white.darker};
    display: flex;
    justify-content: center;
`

const IntroduceValue=styled.textarea`
    width:75%;
    height:70%;
    background-color: ${props=>props.theme.black.lighter};
    border-radius: 12px;
    color:${props=>props.theme.white.lighter};
    font-size:20px;
    padding:10px;
`

const EditNickNameAndIntroduce=styled.div`
    width:230px;
    height:35px;
    border-radius: 5px;
    background-color: ${props=>props.theme.black.lighter};
    position: absolute;
    bottom:0px;
    color:${props=>props.theme.white.veryDark};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:20px;
    &:hover{
        cursor: pointer;
        scale:1.05;
        background-color:${props=>props.theme.black.darker}
    }
`

const Octave=styled.div`
    width:100%;
    height:25%;
    display: flex;
    align-items: center;
`

const UserOctaveKey=styled.div`
    width:25%;
    height:100%;
    font-size:26px;
    color:${props=>props.theme.white.darker};
    display: flex;
    justify-content: center;

`

export const MyPageVariants:Variants={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:1.5
        }
    }
}


function EditProfile(){
    const [userState,setUserState]=useRecoilState(user);
    const {state}=useLocation();
    const [editting,setEditting]=useState(false);
    const memberId='16de3dcd-2fca-473e-8219-6632d8a011a5';
    const logoImgInput=useRef<HTMLInputElement>(null);
    const nickNameValue=useRef<HTMLInputElement>(null);
    const introduceValue=useRef<HTMLTextAreaElement>(null);
    const EditImgClicked=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.preventDefault();
        if (logoImgInput.current) {
            logoImgInput.current.click();
        }
    };
    const onImgChange=(event:any)=>{
        const selectedFile = event.target.files[0]; // 선택된 파일
        const formData = new FormData();

        formData.append("image", selectedFile); // FormData에 파일 추가

        axiosPrivate.put(`http://3.37.47.43:8080/api/members/${memberId}/profile-image`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then(res=>{
            localStorage.setItem("profileImg", res.data.body.s3URL);
            setUserState({
                ...userState,
                profileImg:res.data.body.s3URL
            })
        });
    }
    const EditNickNameAndIntroduceClicked=()=>{
        if(nickNameValue.current && introduceValue.current && !editting){
            nickNameValue.current.disabled=false;
            introduceValue.current.disabled=false;
            setEditting(prev=>!prev);
        }
        if(editting){
            if(nickNameValue.current){
                const confirmed = window.confirm("정말 수정하시겠습니까?");
                if(confirmed){
                    axiosPrivate.put(`http://3.37.47.43:8080/api/members/${memberId}`,{
                        "nickname": nickNameValue.current?.value,
                        "introduction": introduceValue.current?.value
                    }).then(res=>{
                        localStorage.setItem("nickName",res.data.body.member.nickname);
                        localStorage.setItem("introduction",res.data.body.member.introduction);
                        setUserState({
                            ...userState,
                            nickname:res.data.body.member.nickname,
                            introduction:res.data.body.member.introduction
                        })
                    });
                }
                else{
                    window.location.reload()
                }
            }
        }
    }
    return <><DetailHeader />
    <AboutWrapper style={{display:"flex",flexDirection:"column"}}>
        <EditProfileArea variants={MyPageVariants} initial="initial" animate="animate">
            <ImgArea>
                <ProfileImg src={userState.profileImg}></ProfileImg>
                <InputImg ref={logoImgInput} type='file' accept='image/*' onChange={onImgChange} />
                <EditImg onClick={EditImgClicked}><span style={{marginRight:"7px"}}><FontAwesomeIcon icon={faPen} /></span>Change Profile</EditImg>
            </ImgArea>
            <TextArea>
                <NickName>
                    <NickNameKey>NickName:</NickNameKey>
                    <NickNameValue ref={nickNameValue} disabled placeholder={userState.nickname} />
                </NickName>
                <Introduce>
                    <IntroduceKey>Introduce:</IntroduceKey>
                    <IntroduceValue ref={introduceValue} disabled >{userState.introduction}</IntroduceValue>
                </Introduce>
                <Octave>
                    <UserOctaveKey>Octave: {userState.octave}</UserOctaveKey>
                </Octave>
                <EditNickNameAndIntroduce onClick={EditNickNameAndIntroduceClicked}><span style={{marginRight:"7px"}}><FontAwesomeIcon icon={faPen} /></span>Edit Profile</EditNickNameAndIntroduce>
            </TextArea>
        </EditProfileArea>
        <SavedSongArea variants={MyPageVariants} initial="initial" animate="animate">
        {state ? <>
            <SongBox color="#ffd700" albumCover={state.recommendations[0].albumCover} title={state.recommendation[0].title} singer={state.recommendation[0].singer} songOctave={state.recommendation[0].songOctave} youtubeUrl={state.recommendation[0].youtubeURL} />
            <SongBox color="#c0c0c0" albumCover={state.recommendations[1].albumCover} title={state.recommendation[1].title} singer={state.recommendation[1].singer} songOctave={state.recommendation[1].songOctave} youtubeUrl={state.recommendation[1].youtubeURL} />            
            <SongBox color="#CD7F32" albumCover={state.recommendations[2].albumCover} title={state.recommendation[2].title} singer={state.recommendation[2].singer} songOctave={state.recommendation[2].songOctave} youtubeUrl={state.recommendation[2].youtubeURL} />       
            </> : null}
        </SavedSongArea>
    </AboutWrapper>
    </>
}

export default EditProfile;

