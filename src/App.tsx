import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, NavBar, ProductList, ProductMant } from "./components";
import { IndexPage, MoviesPage, ProductsPage } from "./pages";

function App() {
  return (
    <div className="container">
      <header className="mb-1">
        <NavBar />
      </header>
      <main>
        <section className="cuerpo">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/products" element={<ProductsPage children={<ProductList />} />} />
            <Route path="/products/:id" element={<ProductsPage children={<ProductMant />} />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
