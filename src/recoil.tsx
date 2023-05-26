import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { axiosPrivate } from "./axios";

const { persistAtom } = recoilPersist();

const getAccessToken=()=>{
  const accessToken=localStorage.getItem("accessToken")||null;
  if (accessToken) {
    // 어세스토큰이 있으면 axios 인스턴스에 커먼 헤더로 집어넣음
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;

    return accessToken;
  }
  return null;
}

export const accessToken = atom({
    key: 'accessToken',
    default: getAccessToken(),
});
