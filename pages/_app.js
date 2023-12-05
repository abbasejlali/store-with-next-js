import "@/styles/globals.css";

// Layout
import Menu from "@/Components/Layout/Menu";

// Redux Toolkit
import { Provider } from "react-redux";
import store from "@/Redux Toolkit/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Menu>
        <Component {...pageProps} />
      </Menu>
    </Provider>
  );
}
