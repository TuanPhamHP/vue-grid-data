const roleRepo = (axios) => {
  return {
    loginUser(payload) {
      return axios
        .post(`/api/auth/login`, payload, {
          headers: {
            Authorization: "",
          },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getApproval(payload) {
      return axios
        .get(`api/approval-requests`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}

export default roleRepo
