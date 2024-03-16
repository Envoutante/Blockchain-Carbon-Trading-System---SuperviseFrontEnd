import request from "@/utils/request";

export default {
  turnToPost(url, urlType, postBody, token) {
    return request({
      url: "/turnTo",
      method: "post",
      data: {
        url: url,
        urlType: urlType,
        postBody: postBody,
        token: token,
      },
    });
  },

  turnToGet(url, urlType, token) {
    return request({
      url: "/turnTo",
      method: "post",
      data: {
        url: url,
        urlType: urlType,
        token: token,
      },
    });
  },
};
