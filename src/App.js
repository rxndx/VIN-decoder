import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import VinDecode from "./components/VinDecode";
import Variables from "./components/Variables";
import OneVariable from "./components/OneVariable";

function App() {
  return (
      <HashRouter>
          <Provider store={store}>
              <Routes>
                  <Route path="/" element={<VinDecode />} />
                  <Route path="/variables" element={<Variables />} />
                  <Route path="/variables/:id" element={<OneVariable />} />
              </Routes>
          </Provider>
      </HashRouter>
  );
}

export default App;