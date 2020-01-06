import axios from 'axios'


// const URL_STRING = "http://localhost:5000/v1/engineer/profile"

// export const getEngineerProfile = (token) => {
//     return {
//         type: 'GET_ENG_PROFILE_FULFILLED',
//         payload: axios.get(URL_STRING, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer `.concat(token)
//             }
//         })
//     }
// }
export const getEngineerProfile = (token) => dispatch => {
    axios.get('https://hiringchannel-api.herokuapp.com/v1/engineer/profile', 
    { headers: 
      { 'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
    .then(res => {
      console.log("res ",res)
      dispatch({
        type: 'GET_ENG_PROFILE_FULFILLED',
        payload: res.data.data[0]
      })
    })
    .catch(err => {
        console.log(err)
    })
                
}

// export const patchEngineerProfile = (token, data, id) => dispatch => {
//   axios.patch(`https://hiringchannel-api.herokuapp.com/v1/engineer/${id}`, null, {
//     headers: headers,
//     params: data
//   })
  // .then(res => {
    
  //   Swal.fire({
  //     icon: 'success',
  //     title:'Success',
  //     text:'Profile Updated.'
  //   })
  //   //this.getFetch('https://hiringchannel-api.herokuapp.com/v1/engineer')
  // })
  // .catch(err => {
  //   Swal.fire ({
  //     icon: 'error',
  //     title: 'error',
  //     text: 'Update Failed.'
  //   })
  // })
              
// }