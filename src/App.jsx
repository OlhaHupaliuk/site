import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import Loader from "./components/Loader";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  async function fetchLatest() {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch("https://technostock.onrender.com/api/latest");
      if (!res.ok) throw new Error("Failed to fetch latest products");
      const data = await res.json();
      setProducts(data.products);
      setTimestamp(data.timestamp);
      setCount(data.count);
    } catch (err) {
      setError("Не вдалося підключитися до сервера. Перевірте підключення або спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  }

  async function runScraper() {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch("https://technostock.onrender.com/api/scrape", { method: "POST" });
      if (!res.ok) throw new Error("Failed to run scraper");
      const data = await res.json();
      setProducts(data.products);
      setTimestamp(data.timestamp);
      setCount(data.count);
    } catch (err) {
      setError("Не вдалося запустити парсер. Сервер недоступний або сталася помилка.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">🛠 Нові товари</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={runScraper}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          🔄 Запустити парсер
        </button>
        {timestamp && (
          <p className="text-gray-600">
            Останнє оновлення: {timestamp} ({count} нових товарів)
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      {loading ? <p>Завантаження...</p> : <ProductsList products={products} />}
    </div>
  );
}

export default App;