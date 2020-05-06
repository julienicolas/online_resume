  
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import AuthentificationReducer from "../containers/subscription/reducers";
import ErrorsReducer from           '../containers/errors/reducers';
import UserReducer from             '../containers/user/reducers';
import ProfileReducer from          '../containers/profile/reducers';
import HomeReducer from             '../containers/home/reducers';
import FormReducer from             '../containers/profile/form-reducer';

const rootReducer = combineReducers({
  form,
  authentification: AuthentificationReducer,
  errors: ErrorsReducer,
  user: UserReducer,
  profile: ProfileReducer,
  home: HomeReducer,
  profileForm: FormReducer

});

export default rootReducer;