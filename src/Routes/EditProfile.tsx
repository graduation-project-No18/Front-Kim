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

const EditProfileArea=styled(motion.div)`
    width:80%;
    height:50%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
`

const SavedSongArea=styled(motion.div)`
    width:100%;
    height:40%;
    background-color: red;
    display: flex;
    justify-content: center;
`

const ImgArea=styled.div`
    width:30%;
    height:80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const ProfileImg=styled.img`
    width: 300px;
    height:300px;
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

const TextArea=styled.div`
    width:60%;
    height:80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const NickName=styled.div`
    width:100%;
    height:27%;
    display: flex;
    align-items: center;
`

const Introduce=styled.div`
    width:100%;
    height:67%;
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
                <EditNickNameAndIntroduce onClick={EditNickNameAndIntroduceClicked}><span style={{marginRight:"7px"}}><FontAwesomeIcon icon={faPen} /></span>Edit Profile</EditNickNameAndIntroduce>
            </TextArea>
        </EditProfileArea>
        <SavedSongArea variants={MyPageVariants} initial="initial" animate="animate">
            <SongBox albumCover="https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_1280.jpg" title="나와 같다면" singer="김연우" songOctave="F3" youtubeUrl="https://youtube.com" />
        </SavedSongArea>
    </AboutWrapper>
    </>
}

export default EditProfile;

