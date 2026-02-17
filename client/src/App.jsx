import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Layout>
  );
}

export default App;
