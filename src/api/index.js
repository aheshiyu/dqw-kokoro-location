// const apiUrl = localStorage.getItem('api_url') ? localStorage.getItem('api_url') : ''
const apiUrl = 'https://script.google.com/macros/s/AKfycbyRJtwi1GAFlScecRTfPX5H2k95_nMmuJ5Yuh74qZaHJ8PPgjHWsq3Lnh4mh9jk7Xb6sg/exec'

const fetch_func = async (data) => {
  if (apiUrl == '') return
  console.log(data)
  let res = null
  await fetch(apiUrl, {
    "method": "POST",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify(data)
  })
    .then(async (response) => {
      await response.json().then(res_data => {
        res = res_data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  return res
}

const fetch_data = async (start_date, end_date) => {
  if (apiUrl == '') return
  const data = {
    method: "GET",
    params: {
      start_date: start_date,
      end_date: end_date
    }
  }
  return fetch_func(data)
}

export default {
  fetch_func,
  fetch_data,
}