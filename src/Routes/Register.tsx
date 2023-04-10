import AboutHeader from "../components/AboutHeader";
import { AboutWrapper } from "./About";
import { Error, FormButton, FormHeader, FormWrapper, FormVariants, FormInput, AboutFooter } from "./Login";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

interface FormValues{
    name:string,
    email:string,
    password:string,
    checkpassword:string
}

const RegisterSuccess=styled.div`
    font-size:20px;
    margin:10px 0px;
`

const AlreadyRegistered=styled.div`
    font-size:20px;
    margin:10px 0px;
`

export const Form = styled.form`
    height:50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Register(){
    const onSubmit:SubmitHandler<FormValues> = data => {
        if (data.password !== data.checkpassword) {      
            setError(
              'checkpassword',
              { message: '비밀번호가 일치하지 않습니다.' }, 
              { shouldFocus: true }, 
            );
            return;
        }
        console.log(data);
    }
    const { register, handleSubmit, formState: { errors },setError } = useForm<FormValues>();
    const [registerSuccess,setRegisterSuccess]=useState(false);
    const [areadyRegistered,setAlreadyRegistered]=useState(false);
    return <>
    <AboutHeader />
    <AboutWrapper>
    <FormWrapper variants={FormVariants} initial="initial" animate="animate">
            <FormHeader>
                회원가입
            </FormHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInput {...register("name", { required: true,
                    maxLength:{value:20,message:"이름이 너무 깁니다."},
                    minLength:{value:2,message:"이름이 너무 짧습니다."} })} placeholder="이름"></FormInput>
                {errors.name ? <Error>{errors?.name?.message}</Error> : null}
                <FormInput {...register("email", { required: true,pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞지 않습니다.",
            }, })} placeholder="이메일"></FormInput>
                {errors.email ? <Error>{errors?.email?.message}</Error> : null}
                <FormInput {...register("password", { required: true,
                    maxLength:{value:15, message:"비밀번호가 너무 깁니다."},
                    minLength: {value: 8, message: "비밀번호가 너무 짧습니다."},
                    pattern:{value:/^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,message:"영문과, 숫자를 혼용하여 입력해주세요."} })} placeholder="비밀번호" type="password"></FormInput>
                {errors.password ? <Error>{errors?.password?.message}</Error> : null}
                <FormInput {...register("checkpassword", { required: true })} placeholder="비밀번호 다시 입력" type="password"></FormInput>
                {errors.checkpassword ? <Error>{errors?.checkpassword?.message}</Error> : null}
                {registerSuccess ? <><RegisterSuccess>✅회원가입 성공✅</RegisterSuccess><div style={{fontSize:16}}>로그인 페이지로 이동합니다...</div></> : null}
                {areadyRegistered ? <AlreadyRegistered>❗이미 가입된 이메일입니다.❗</AlreadyRegistered> : null}
                <FormButton style={{marginTop:10}}>회원가입</FormButton>
            </Form>
        </FormWrapper>
        <AboutFooter>
            &copy; NO18. All rights reserved.
        </AboutFooter>
    </AboutWrapper>
    </>
}

export default Register;