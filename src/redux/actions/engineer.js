import axios from 'axios'


export const getEngineer = (token) => dispatch => {
    axios.get(`https://hiringchannel-api.herokuapp.com/v1/engineer`, 
    { headers: 
      { 'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
    .then(res => {
      console.log("res eng list ",res)
      dispatch({
        type: 'GET_ENGINEER_FULFILLED',
        payload: res.data.result
      })
    })
    // axios.get(`https://hiringchannel-api.herokuapp.com/v1/company/profile`, 
    // { headers: 
    //   { 'Content-Type': 'application/json',
    //     Authorization: `Bearer `.concat(token)
    //   }
    // })
    // .then(res => {
    //   console.log("res pro company ",res)
    //   dispatch({
    //     type: 'GET_ENGINEER_FULFILLED',
    //     payload: res.data.data
    //   })
    // })
    .catch(err => {
        console.log(err)
    })
                
}


// axios.get(url[1],{ headers: { Authorization: `Bearer ${auth.token}`}})
//             .then(res => {
//                 console.log("res axios ",res.data)
//                 this.setState({
//                     data: res.data.result,
//                 })
//                 axios.get(url[0],{ headers: { Authorization: `Bearer ${auth.token}`}})
//             .then(res => {
//                 console.log("res axios pro company ",res.data.data[0])
//                 this.setState({
//                     dataCompany: res.data.data,
//                     id_company: res.data.data[0].id,
//                     name_company: res.data.data[0].name_company,
//                     description: res.data.data[0].description,
//                     location: res.data.data[0].location,
//                 })
                
//             })   
//             })