import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ISongsBox {
    albumCover: string
    title: string;
    singer: string;
    songOctave: string;
    youtubeUrl: string;
    color:string;
}

const SongList=styled.div`
    width:20%;
    height:90%;
    border-radius: 5%;
    background-color: ${props=>props.theme.black.lighter};
    border:1px solid blue;
    margin-right:2%;
    margin-left: 2%;
    position: relative;
`

const AlbumCover=styled.img`
    width:100%;
    height:70%;
    border-radius: 7%;
    border-bottom:2px solid gray;
`

const IntroduceArea=styled.div`
    width:100%;
    height:30%;
    padding:10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    font-size:18px;
    color:${props=>props.theme.white.darker};
`

const SongTitle=styled.div`
`

const Singer=styled.div`
`

const Octave=styled.div`
`

const YoutubeIcon=styled.div`
    position: absolute;
    bottom:20px;
    right:20px;
    font-size:40px;
    color:red;
    &:hover{
        cursor: pointer;
    };
`

const MedalColor=styled.div<{color:string}>`
    color: ${props=>props.color};
    width:30px;
    height:30px;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:5px;
    left:5px;
    font-size:40px;
`

function SongBox(props:ISongsBox){
    const navigate=useNavigate();
    const youtubeIconClicked=()=>{
        window.open(props.youtubeUrl)
    }
    return <SongList>
        <AlbumCover src={require(props.albumCover).default} />
        <IntroduceArea>
            <SongTitle>제목: {props.title}</SongTitle>
            <Singer>가수: {props.singer}</Singer>
            <Octave>최고 음:{props.songOctave}</Octave>
            <YoutubeIcon onClick={youtubeIconClicked}><FontAwesomeIcon icon={faYoutube} /></YoutubeIcon>
        </IntroduceArea>
        <MedalColor color={props.color}><FontAwesomeIcon icon={faMedal} /></MedalColor>
    </SongList>
}

export default SongBox;