const initialState = {
    engineerProfile: [],
    engineerDob:'',
    isPending: false,
    isRejected: false,
    isFulfilled: false
};

const getEngineerProfile = (State = initialState, action) => {
    console.log("ACTION PAYLOAD ", action.payload)

    switch(action.type){
        case "GET_ENG_PROFILE_PENDING":
            return {
                ...State,
                isPending: true,
                isRejected: false,
                isFulfilled: false,

            };
        case "GET_ENG_PROFILE_REJECTED":
            return {
                ...State,
                isPending: false,
                isRejected: true
            };
        case "GET_ENG_PROFILE_FULFILLED":
            console.log("ACTION PAYLOAD ", action.payload)
            console.log("ACTION BIRTH ", action.birth)
            return {
                ...State,
                isPending: false,
                isFulfilled: true,
                engineerProfile: action.payload,
                engineerDob: action.birth
                
            };
        default:
            return State
    }
} 

export default getEngineerProfile