import "@/styles/globals.css";

// Layout
import Menu from "@/Components/Layout/Menu";

export default function App({ Component, pageProps }) {
  return (
    <Menu>
      <Component {...pageProps} />
    </Menu>
  );
}
