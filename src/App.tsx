import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "./pages/products/ProductsPage";
import { MoviesPage } from "./pages/movies/MoviesPage";
import { IndexPage } from "./pages/index/IndexPage";
import { NavBar } from "./components/ui/NavBar";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <NavBar />
      </header>
      <main>
        <section>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
