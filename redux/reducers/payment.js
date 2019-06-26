// import {
//   POST_PAYMENT_REQUEST,
//   POST_PAYMENT_SUCCESS,
//   POST_PAYMENT_FAILURE,
// } from '../actions';

// const INITIAL_STATE = {
//   payments: null,
//   loading: false,
//   error: null,
// };

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case POST_PAYMENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case POST_PAYMENT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//       };
//     case POST_PAYMENT_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
