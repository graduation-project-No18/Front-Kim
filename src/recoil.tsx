import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { axiosPrivate } from "./axios";

const { persistAtom } = recoilPersist();

interface UserState {
  deleted: boolean;
  introduction: string;
  nickname: string;
  octave: string | null;
  profileImg: string;
  isAuthenticated:boolean;
}

const defaultUserState: UserState = {
  deleted: false,
  introduction:"NO18에서 본인의 인생곡을 찾아보세요!",
  nickname: "NO18",
  octave: null,
  profileImg: "https://i.pinimg.com/originals/02/0b/c5/020bc5dcdd8c9d0cde5d534f377820aa.jpg",
  isAuthenticated:false
};

const getAccessToken=():UserState=>{
  const accessToken=localStorage.getItem("accessToken");
  const storedProfileImg = localStorage.getItem("profileImg");
  const nickName=localStorage.getItem("nickName");
  const introduction=localStorage.getItem("introduction");
  if(accessToken){
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
    return {...defaultUserState,
        profileImg:storedProfileImg||defaultUserState.profileImg,
        isAuthenticated:true,
        nickname:nickName||defaultUserState.nickname,
        introduction:introduction||defaultUserState.introduction
      }
  }
  return {...defaultUserState};
}

export const user=atom<UserState>({
  key:"user",
  default:getAccessToken(),
})
