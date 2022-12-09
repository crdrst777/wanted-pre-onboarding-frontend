import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* state들을 어떤 컴포넌트들에게 제공할것인가. 하는 바깥 울타리를 정의. (store는 반드시 프롭으로 정의해줘야 이 컴포넌트들이 사용할수있다.) */}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
