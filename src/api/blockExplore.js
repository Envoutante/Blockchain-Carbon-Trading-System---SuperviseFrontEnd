import request from "@/utils/request";

const blockExploreApi = {
  login: "/auth/login",
  detailTransaction: "/api/transaction",
  curChannel: "/api/curChannel",
};

export function bElogin() {
  return request({
    url: "/turnTo",
    method: "post",
    data: {
      url: blockExploreApi.login,
      urlType: "POST",
      postBody: {
        user: "exploreradmin",
        password: "exploreradminpw",
        network: "org1-network",
      },
      // "token": ""
    },
  });
}

export function bEcurChannel(token) {
  return request({
    url: "/turnTo",
    method: "post",
    data: {
      url: blockExploreApi.curChannel,
      urlType: "GET",
      token: token,
    },
  });
}

export function bETransactionDetail(curChannel_, txid, bEtoken) {
  return request({
    url: "/turnTo",
    method: "post",
    data: {
      url: blockExploreApi.detailTransaction + "/" + curChannel_ + "/" + txid,
      urlType: "GET",
      // "postBody": {},
      token: bEtoken,
    },
  });
}
