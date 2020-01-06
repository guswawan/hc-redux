const initialState = {
    engineer: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
};

const getEngineer = (State = initialState, action) => {
    console.log("ACTION PAYLOAD ENG ", action.payload)

    switch(action.type){
        case "GET_ENGINEER_PENDING":
            return {
                ...State,
                isPending: true,
                isRejected: false,
                isFulfilled: false,

            };
        case "GET_ENGINEER_REJECTED":
            return {
                ...State,
                isPending: false,
                isRejected: true
            };
        case "GET_ENGINEER_FULFILLED":
            console.log("ACTION PAYLOAD ", action.payload)
            return {
                ...State,
                isPending: false,
                isFulfilled: true,
                engineer: action.payload
            };
        default:
            return State
    }
} 

export default getEngineer