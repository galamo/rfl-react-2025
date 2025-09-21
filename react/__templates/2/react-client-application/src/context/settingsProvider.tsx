import { useReducer } from "react";
import { IGlobalState, initialState, SettingsContext } from ".";

export const ACTIONS = {
  SET_IS_LOCAL_TIME: "SET_IS_LOCAL_TIME",
  SET_PRETTY_NUMBER: "SET_PRETTY_NUMBER"
}


function settingsReducer(
  state: IGlobalState,
  action: { type: string; payload?: any }
): IGlobalState {
  console.log("Settings reducer running?")
  switch (action.type) {
    case ACTIONS.SET_IS_LOCAL_TIME: {
      const newState = { ...state, isLocalTime: action.payload.isLocalTime };
      setStateInLs<IGlobalState>(newState)
      return newState;
    }
    case ACTIONS.SET_PRETTY_NUMBER: {
      const newState = { ...state, isPrettyNumber: action.payload.isPrettyNumber };
      setStateInLs<IGlobalState>(newState)
      return newState;
    }
    default: {
      return state;
    }
  }
}
type Props = {
  children: React.ReactElement;
};

// PUT IT IN ANOTHER FILE
function setStateInLs<T>(stateLs: T) {
  localStorage.setItem("settings", JSON.stringify(stateLs))
}
function getInitialState() {
  let state = initialState
  try {
    const resultFromLS = localStorage.getItem("settings");
    if (!resultFromLS) throw new Error("LS ERROR IN SETTINGS")
    state = JSON.parse(resultFromLS)
  } catch (error) {
    console.log(error)
  }
  return state
}
export default function SettingsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(settingsReducer, getInitialState());
  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}
