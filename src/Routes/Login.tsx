import styled from "styled-components";
import AboutHeader from "../components/AboutHeader";
import { AboutWrapper } from "./About";
import { Variants, motion } from "framer-motion";
import { useForm,SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

export const FormWrapper = styled(motion.div)`
    width:400px;
    height:600px;
    background-color: rgba(0,0,0,1);
`

export const FormHeader = styled.div`
    color:${props => props.theme.white.lighter};
    height:20%;
    font-size:30px;
    font-weight:500;
    display: flex;
    align-items: center;
    padding:0px 50px;
`

const Form = styled.form`
    height:35%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FormInput = styled.input`
    color:white;
    width: 320px;
    height:50px;
    background-color:#333333;
    border:none;
    border-radius: 8px;
    margin-bottom:12px;
    padding-left: 20px;
    box-sizing:border-box;
    ::placeholder{
        color:#8C8B8B;
        font-size:16px;
    }
`

const SocialLoginButton=styled.div`
    height:35%;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const KakaoLogin=styled.button`
    color:white;
    box-sizing:border-box;
    width: 320px;
    height:50px;
    background-color:#FEE500;
    border:none;
    border-radius: 8px;
    margin-bottom:12px;
    padding-left: 20px;
    color:#000000;
    font-size:18px;
    display:flex;
    align-items: center;
    &:hover{
        cursor:pointer;
    }
    div{
        width:90%;
        display: flex;
        justify-content: center;
    }
`

export const NaverLogin=styled.button`
    color:white;
    box-sizing:border-box;
    width: 320px;
    height:50px;
    background-color:#03C75A;
    border:none;
    border-radius: 8px;
    margin-bottom:12px;
    padding-left: 20px;
    color:white;
    font-size:18px;
    display:flex;
    align-items: center;
    &:hover{
        cursor:pointer;
    }
    div{
        width:90%;
        display: flex;
        justify-content: center;
    }
`

export const GoogleLogin=styled.button`
    box-sizing:border-box;
    color:white;
    width: 320px;
    height:50px;
    background-color:rgb(255,255,255);
    border:none;
    border-radius: 8px;
    margin-bottom:12px;
    padding-left: 20px;
    color:#000000;
    font-size:18px;
    display:flex;
    align-items: center;
    &:hover{
        cursor:pointer;
    }
    div{
        width:90%;
        display: flex;
        justify-content: center;
    }
`

export const FormFooter = styled.div`
    height:10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#8C8B8B;
    padding:0px 40px;
    word-break: keep-all;
    h1{
        margin-bottom:18px;
        a{
            color:white;
            font-size:15px;
            font-weight:500;
        }
    }
    h2{
        font-size:14px;
        line-height: 120%;
    }
`

export const FormButton = styled.button`
    box-sizing:border-box;
    background-color: ${props=>props.theme.blue.dark};
    width: 320px;
    height:50px;
    border-radius: 8px;
    border: none;
    font-size:15px;
    color:${props => props.theme.white.darker};
    &:hover{
        cursor: pointer;
        color:${props=>props.theme.black.darker};
    }
`

const LoginSuccess = styled.div`
    font-size:20px;
    margin:10px 0px;
`

export const Error=styled.div`
    font-size:14px;
    margin-bottom:12px;
    margin-top:5px;
    color:#E87C03;
    width: 300px;
`

export const AboutFooter=styled.footer`
    color:${props=>props.theme.white.darker};
    position: absolute;
    bottom:15px;
    font-size:18px;
`

interface FormValues {
    email: string,
    password: string
}

export const FormVariants:Variants={
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

function Login(){
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>();
    const onSubmit:SubmitHandler<FormValues>=(data)=>console.log(data);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const kakaoLogin=()=>{

    }
    const naverLogin=()=>{

    }
    const googleLogin=()=>{

    }
    return <>
    <AboutHeader />
    <AboutWrapper>
    <FormWrapper variants={FormVariants} initial="initial" animate="animate">
                <FormHeader>
                    로그인
                </FormHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput style={{ borderBottom: `${Boolean(errors.email)} ? "3px solid black" : "null" ` }} {...register("email", {
                        required: true, pattern: {
                            value:
                                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                            message: "이메일 형식에 맞지 않습니다.",
                        },
                    })} placeholder="이메일"></FormInput>
                    {errors.email ? <Error>{errors?.email?.message}</Error> : null}
                    <FormInput {...register("password", {
                        required: true,
                    })} placeholder="비밀번호" type="password" ></FormInput>
                    {errors.password ? <Error>{errors?.password?.message}</Error> : null}
                    {loginSuccess ? <><LoginSuccess>✅로그인 성공✅</LoginSuccess><div style={{ fontSize: 16 }}>홈으로 이동합니다...</div></> : null}
                    <FormButton style={{ marginTop: 20 }}>로그인</FormButton>
                </Form>
                <SocialLoginButton>
                <KakaoLogin onClick={kakaoLogin}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.997 0.5625C3.58092 0.5625 0 3.40351 0 6.90944C0 9.17621 1.49606 11.1619 3.74916 12.2892L2.93804 15.2058C2.93804 15.2058 2.92302 15.3418 3.01014 15.3932C3.09726 15.4446 3.2024 15.4053 3.2024 15.4053C3.45475 15.369 6.11641 13.4861 6.58205 13.1597C7.04168 13.2262 7.51934 13.2594 8.003 13.2594C12.4191 13.2594 16 10.4184 16 6.91246C16 3.40653 12.4131 0.5625 7.997 0.5625Z" fill="black"></path></svg>
                        <div>카카오 로그인</div>
                </KakaoLogin>
                <NaverLogin onClick={naverLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" role="img" viewBox="0 0 24 24"><path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z"/></svg>
                    <div>네이버 로그인</div>
                </NaverLogin>
                <GoogleLogin onClick={googleLogin}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9998 8.17778C15.9998 7.52001 15.9454 7.04001 15.8275 6.54224H8.16309V9.51109H12.6619C12.5713 10.2489 12.0815 11.36 10.993 12.1066L10.9777 12.206L13.4011 14.0458L13.569 14.0622C15.1109 12.6667 15.9998 10.6133 15.9998 8.17778Z" fill="#4285F4"></path><path d="M8.16266 16C10.3667 16 12.217 15.2889 13.5686 14.0623L10.9926 12.1067C10.3032 12.5778 9.37805 12.9067 8.16266 12.9067C6.00394 12.9067 4.17176 11.5112 3.51863 9.58228L3.4229 9.59024L0.90307 11.5014L0.870117 11.5911C2.21251 14.2044 4.96989 16 8.16266 16Z" fill="#34A853"></path><path d="M3.51924 9.58228C3.34691 9.08451 3.24717 8.55114 3.24717 8.00005C3.24717 7.44891 3.34691 6.9156 3.51018 6.41782L3.50561 6.31181L0.954205 4.37L0.870728 4.40891C0.317464 5.49337 0 6.71117 0 8.00005C0 9.28894 0.317464 10.5067 0.870728 11.5911L3.51924 9.58228Z" fill="#FBBC05"></path><path d="M8.16266 3.09331C9.69552 3.09331 10.7295 3.7422 11.3191 4.28446L13.623 2.08C12.208 0.791115 10.3667 0 8.16266 0C4.96989 0 2.21251 1.79554 0.870117 4.40885L3.50956 6.41777C4.17176 4.48889 6.00394 3.09331 8.16266 3.09331Z" fill="#EB4335"></path></svg>
                    <div>Sign with Google</div>
                </GoogleLogin>
                </SocialLoginButton>
                <FormFooter>
                    <h1>
                        <span>NO18 회원이 아닌가요? </span>
                        <Link to="/register"><span>지금 가입하세요.</span></Link>
                    </h1>
                </FormFooter>
            </FormWrapper>
            <AboutFooter>
                &copy; NO18. All rights reserved.
            </AboutFooter>
    </AboutWrapper>
    </>
}

export default Login;