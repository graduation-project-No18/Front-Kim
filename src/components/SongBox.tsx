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
    width:20%;
    height:100%;
    border-radius: 5%;
`

const AlbumCover=styled.img`
    width:100%;
    height:70%;
    border-radius: 7%;
`

const IntroduceArea=styled.div`
    width:100%;
    height:30%;
    padding:10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
`

const SongTitle=styled.div`
    font-size:18px;
`

const Singer=styled.div`
    font-size:18px;
`

const Octave=styled.div`
    font-size:18px;
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