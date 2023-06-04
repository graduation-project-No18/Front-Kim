import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface ISongsBox {
    albumCover: string
    title: string;
    singer: string;
    songOctave: string;
    youtubeUrl: string;
}

const SongList=styled.div`
    width:19%;
    height:100%;
    border-radius: 5%;
    background-color: ${props=>props.theme.black.lighter};
    border:1px solid blue;
    margin-right:0.5%;
    margin-left: 0.5%;
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

function SongBox(props:ISongsBox){
    const youtubeIconClicked=()=>{

    }
    return <SongList>
        <AlbumCover src={props.albumCover} />
        <IntroduceArea>
            <SongTitle>제목: {props.title}</SongTitle>
            <Singer>가수: {props.singer}</Singer>
            <Octave>최고 음:{props.songOctave}</Octave>
            <YoutubeIcon onClick={youtubeIconClicked}><FontAwesomeIcon icon={faYoutube} /></YoutubeIcon>
        </IntroduceArea>
    </SongList>
}

export default SongBox;