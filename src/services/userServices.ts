import { LoginType, RegisterType } from "../types/userType";
import { userApiPath } from "../utils/apiPath";
import requester from "./apiRequester";

class UserService {
    // fetch api dang nhap 
    fetchApiLogin = (data: LoginType) => {
        return requester({
            url: userApiPath.USER_LOGIN,
            method: 'POST',
            data: data
        });
    };

    // fetch api đăng ký tài khoản
    fetchApiRegister = (data: RegisterType) => {
        return requester({
            url: userApiPath.USER_REGISTER,
            method: 'POST',
            data: data
        });
    };

    fetApiGetAllUser = (keyWord:string = '') => {
        return requester({
            url: userApiPath.GET_ALL_USER,
            method: 'GET',
            params: {
                keyword:keyWord,
            }
        })
    }
}

export const userService = new UserService()