import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { axiosPrivate } from "./axios";

const { persistAtom } = recoilPersist();

interface UserState {
  deleted: boolean;
  introduction: string | null;
  nickname: string;
  octave: string | null;
  profileImg: string;
  isAuthenticated:boolean;
}

const defaultUserState: UserState = {
  deleted: false,
  introduction: null,
  nickname: "NO18",
  octave: null,
  profileImg: "./img/defaultIcon",
  isAuthenticated:false
};

const getAccessToken=():UserState=>{
  const accessToken=localStorage.getItem("accessToken");
  if(accessToken){
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
    return {...defaultUserState,isAuthenticated:true}
  }
  return {...defaultUserState};
}

export const user=atom<UserState>({
  key:"user",
  default:getAccessToken(),
})