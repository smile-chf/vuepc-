import request from "../utils/request";
function login() {
    return request({
      url: "/volunteerService/user/login",
      method: "POST",
    data:{
        username:"kf123" ,
        password:"kf123456"
    }
    });
  }


  export{
    login
  }