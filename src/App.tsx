import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="tokyo-night" storageKey="portfolio-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
