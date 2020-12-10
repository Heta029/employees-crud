const init = {
    isLogin: localStorage.getItem('isLogin')=='true'?true:false
  };
  
  export const loginReducer = (state = init, action:any) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, isLogin: action.payload };
      default:
        return state;
    }
  };
  