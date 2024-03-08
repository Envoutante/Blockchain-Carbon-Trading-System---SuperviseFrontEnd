import request from "@/utils/request";

export default {
  register(userName, userPwd, Role) {
    return request({
      url: "/auth/superviseRegister",
      method: "post",
      data: {
        userName: userName,
        userPwd: userPwd,
        Role: Role,
      },
    });
  },
};
