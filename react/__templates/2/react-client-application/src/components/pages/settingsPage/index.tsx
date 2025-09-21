import { Switch } from "@mui/material";
import { useContext } from "react";
import { SettingsContext } from "../../../context";
import { ACTIONS } from "../../../context/settingsProvider";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsLocalTime } from "../../../store/slices/settings";

export default function SettingsPage() {
  const settingsContext = useContext(SettingsContext)
  const dispatch = useAppDispatch();
  const isLocalTime = useAppSelector(state => state.settingsSlice.isLocalTime)
  return (
    <div style={{ width: "200px", margin: "auto" }}>
      <h1> Settings Page </h1>
      <div style={{ border: "1px solid black", height: "50vh", padding: "20px" }}>
        <label>
          <h3> Is local time?</h3>
          <Switch checked={isLocalTime} onChange={() => {
            dispatch(setIsLocalTime(!isLocalTime))
          }} />
        </label>

        <label>
          <h3> Is Pretty Number?</h3>
          <Switch checked={settingsContext.isPrettyNumber} onChange={() => {
            if (typeof settingsContext.dispatch === 'function') {
              settingsContext.dispatch({ type: ACTIONS.SET_PRETTY_NUMBER, payload: { isPrettyNumber: !settingsContext.isPrettyNumber } })
            }
          }} />
        </label>

      </div>
    </div>
  );
}
