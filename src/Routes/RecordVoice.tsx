import { Variants, motion } from "framer-motion";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { AboutWrapper } from "./About";

const RecordBox=styled(motion.div)`
    width:50%;
    height:50%;
    position:absolute;
    background-color: ${props=>props.theme.black.lighter};
`

const RecordBoxVariants:Variants={
    initial:{
        opacity:0,
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.8
        }
    }
}

function RecordVoice(){
    return <><MainHeader />
    <AboutWrapper>
        <RecordBox variants={RecordBoxVariants} initial="initial" animate="animate">

        </RecordBox>
    </AboutWrapper>
    </>
}

export default RecordVoice;