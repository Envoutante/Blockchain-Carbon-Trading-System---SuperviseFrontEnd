import request from "@/utils/request";

// export function login(data) {
//   return request({
//     url: "/vue-admin-template/user/login",
//     method: "post",
//     data,
//   });
// }

export function login(userName, userPwd) {
  return request({
    url: "https://mock.apifox.com/m1/2214773-0-default/auth/superviseLogin",
    method: "post",
    params: {
      userName: userName,
      userPwd: userPwd,
    },
  });
}

// export function getInfo(token) {
//   return request({
//     url: "/vue-admin-template/user/info",
//     method: "get",
//     params: { token },
//   });
// }

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
