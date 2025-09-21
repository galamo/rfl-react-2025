import { BrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { createContext } from "react";
import SettingsProvider from "./context/settingsProvider";
import ErrorBoundary from "./components/error/error";
import { Provider } from "react-redux";
import { store } from "./store";
// import ErrorBoundary from "./components/error/error";

interface IAppDateContext {
  format: string;
  isUtc: boolean;
}

export const AppDateContext = createContext<IAppDateContext>({
  format: "yyyy-MMM-dd",
  isUtc: false,
});

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <ErrorBoundary fallback={<div> <h1> Sorry Something went wrong, Liran is working to fix it! 058656452 </h1></div>}>
            <SettingsProvider>
              <AppDateContext.Provider value={{ format: "dd/MMM/yy", isUtc: true }}>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </AppDateContext.Provider>
            </SettingsProvider>
          </ErrorBoundary>
        </div>
      </Provider>
    </>
  );
}

export default App;
