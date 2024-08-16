import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import { appStore } from "./redux/appStore";
import Header from "./components/Header";
import ProductListing from "./components/ProductListing";
import Cart from "./components/cart";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

const stripePromise = loadStripe(
  "pk_test_51Po1XSP9KX5dgx6UXqN6eCINivZ8UFPDfpgA2OIUBNt8IEd8sgFQgb3k1DraptBUkWRtRuN1emfxaasWNhDjVPYF00o0G57iWZ"
);

function App() {
  return (
    <Provider store={appStore}>
      <Elements stripe={stripePromise}>
        <Router>
          <Header />
          <main className="main" role="main">
            <Routes>
              <Route path="/" element={<ProductListing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </Elements>
    </Provider>
  );
}

export default App;
