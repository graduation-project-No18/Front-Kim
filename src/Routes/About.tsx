import styled from "styled-components";
import AboutHeader from "../components/AboutHeader";
import { Variants, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AboutWrapper=styled.main`
    background:linear-gradient(
            to bottom,
            rgba(20, 20, 20, 1) 10%,
            rgba(20, 20, 20, 0.8) 30%,
            rgba(20, 20, 20, 0.4) 50%,
            rgba(20, 20, 20, 0.8) 70%,
            rgba(20, 20, 20, 1) 100%
          ), url('https://i.pinimg.com/564x/73/82/66/7382668785aff62d27adebad8e4dc2ab.jpg');
    background-size:100% 100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const AboutIntro=styled(motion.div)`
    display:flex;
    flex-direction:column;
    align-items:center;
    div{
        margin-bottom:30px;
        display:flex;
        justify-content:center;
    }
    div>span{
        font-size:40px;
        color:${props=>props.theme.white.veryDark};
        font-weight:600;
    }
    div>span:nth-child(2){
        margin-left:15px;
        color:${props=>props.theme.white.darker};
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    p{
        font-size:23px;
        color:${props=>props.theme.white.darker};
        line-height:180%;
        text-align:center;
        margin-bottom:20px;
    }
`

const RegisterLink=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${props=>props.theme.blue.dark};
    border:none;
    width:300px;
    height:50px;
    border-radius: 8px;
    color:${props=>props.theme.white.darker};
    font-size:20px;
    font-weight:500;
    &:hover{
        cursor: pointer;
        color:${props=>props.theme.black.darker};
        scale: 1.05;
        transition:color 0.2s ease-in-out,scale 0.2s ease-in-out;
    }
`

const Board=styled(motion.div)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height:500px;
    padding:0px 13%;
    border-bottom: 8px solid #222;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.85) 100%);
    color:${props=>props.theme.white.darker};
`

const Introduce=styled.div`
    font-weight:500;
    width:45%;
    word-break: keep-all;
    h1{
        font-size:60px;
        margin-bottom:20px;
        line-height:130%;
    };
    h2{
        font-size:25px;
        line-height: 150%;
    }
`

const BoardImg=styled(motion.img)`
    width:45%;
`

const AboutFooter=styled.footer`
    position: relative;
    height:100px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.88) 100%);
    color:${props=>props.theme.white.darker};
    display:flex;
    align-items: center;
    div:first-child{
        font-size:26px;
        font-family: 'Beau Rivage', cursive;
        padding-left:20px;
    }
    div:nth-child(2){
        position: absolute;
        bottom:5px;
        width:100%;
        font-size:18px;
        margin-bottom:8px;
        text-align:center;
    }
`

export const AboutIntroVariants:Variants={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:2
        }
    }
}

function About(){
    const navigate=useNavigate();
    const onClickStart=()=>{    
        navigate('/login');
    }
    useEffect(() => {
        AOS.init();
      })
    return <><AboutHeader />
    <AboutWrapper>
        <AboutIntro variants={AboutIntroVariants} initial="initial" animate="animate">
            <div data-aos="zoom-in" data-aos-duration="800">
                <span>About</span>
                <span>'NO18'</span>
            </div>
            <p data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">'NO18'은 사용자의 옥타브와 음색을 측정하여 최적의 노래를 추천해주는 서비스입니다. <br />
               노래방에 가면 어떤 노래를 부를지, 나에게 어울리는 노래는 대체 뭘지 항상 고민하셨던 분들, 대환영입니다!!<br />
               지금 가입하여 자신의 인생노래를 찾아보세요.
            </p>
            <RegisterLink data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="800" onClick={onClickStart}>시작하기 &rarr;</RegisterLink>
        </AboutIntro>
    </AboutWrapper>
    <Board style={{borderTop:"8px solid #222"}}>
            <Introduce data-aos="fade-right" data-aos-duration="1500">
                <h1>녹음</h1>
                <h2>로그인 후 마이크를 화면에 드래그 하여 놓으면 녹음창이 나옵니다. 녹음 버튼을 누른 뒤 본인의 소리를 녹음해보세요.</h2>
            </Introduce>
            <BoardImg data-aos="zoom-out" data-aos-duration="1500" src="https://cdn.pixabay.com/photo/2019/01/18/15/03/podcast-3939905_960_720.jpg 1x, https://cdn.pixabay.com/photo/2019/01/18/15/03/podcast-3939905_1280.jpg"></BoardImg>
    </Board>
    <Board>
            <BoardImg data-aos="zoom-out" data-aos-duration="1500" src="https://media.istockphoto.com/id/1154262490/ko/%EC%82%AC%EC%A7%84/gui-%EA%B0%9C%EB%85%90-%EC%82%AC%EC%9D%B4%EB%B2%84-%EA%B3%B5%EA%B0%84.jpg?s=612x612&w=0&k=20&c=44SgSKSgN-MuuF6Q_hzYyv5U62Uf_WhhyNn5vu-Yqg8="></BoardImg>
            <Introduce data-aos="fade-left" data-aos-duration="1500">
                <h1>분석</h1>
                <h2>녹음을 진행한 후 확인버튼을 누르시면, AI가 옥타브와 음색을 중점으로 당신의 목소리를 분석해 드립니다.</h2>
            </Introduce>
    </Board>
    <Board>
            <Introduce data-aos="fade-right" data-aos-duration="1500">
                <h1>추천</h1>
                <h2>AI가 당신의 고음이 불안해지는 지점과 음색을 파악하여, 안정적으로 잘 부를 수 있는 노래들을 추천해 드립니다. 들어보신 후 마음에 드시면 노래를 저장하실 수 있습니다.</h2>
            </Introduce>
            <BoardImg data-aos="zoom-out" data-aos-duration="1500" src="https://cdn.pixabay.com/photo/2020/06/15/18/02/music-5302816__340.jpg"></BoardImg>
    </Board>
    <Board>
            <BoardImg data-aos="zoom-out" data-aos-duration="1500" src="https://cdn.pixabay.com/photo/2018/04/13/08/06/father-and-son-3315817__340.jpg"></BoardImg>
            <Introduce data-aos="fade-left" data-aos-duration="1500">
                <h1>연습</h1>
                <h2>노래를 꾸준히 연습하신 후, 다시 테스트해보세요. 본인의 고음이 전에 비해 얼마나 발전했는지 알려드리고, 이에 맞게 노래들을 다시 추천해드릴게요!</h2>
            </Introduce>
    </Board>
        <AboutFooter>
            <div>Developers: Hyeonmin-Kim, Jihoon-Baek, Sanghyuk-Choi, Seho-Choi</div>
            <div>&copy; NO18. All rights reserved.</div>
        </AboutFooter>
    </>
}

export default About;