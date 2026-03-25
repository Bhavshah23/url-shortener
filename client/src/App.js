import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://url-shortener-d23b.onrender.com";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [allUrls, setAllUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyIndex, setCopyIndex] = useState(null);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/url/all`);
      setAllUrls(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // ✅ VALIDATION
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Enter a valid URL (must start with http/https)");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/url/shorten`, {
        originalUrl: url,
      });

      setShortUrl(res.data.shortUrl);
      setUrl("");
      fetchUrls();
    } catch (err) {
      console.error("Shorten error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(`${BASE_URL}/${code}`);
    setCopyIndex(index);

    setTimeout(() => {
      setCopyIndex(null);
    }, 1500);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        URL Shortener
      </h1>

      {/* INPUT CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <p className="mt-4 text-sm">
            <b>Short URL:</b>{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>
          </p>
        )}
      </div>

      {/* LINKS LIST */}
      <div className="mt-8 w-full max-w-2xl">

        {/* 🔄 Refresh Button */}
        <button
          onClick={fetchUrls}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? "Loading..." : "🔄 Refresh"}
        </button>

        <h2 className="text-xl font-semibold mb-4">Your Links</h2>

        {Array.isArray(allUrls) && allUrls.length === 0 && (
          <p className="text-gray-500">No URLs yet</p>
        )}

        {Array.isArray(allUrls) &&
          allUrls.map((u, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow mb-4"
            >
              <p className="text-sm">
                <b>Short:</b>{" "}
                <a
                  href={`${BASE_URL}/${u.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {BASE_URL}/{u.shortCode}
                </a>
              </p>

              <button
                onClick={() => handleCopy(u.shortCode, index)}
                className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
              >
                {copyIndex === index ? "Copied!" : "Copy"}
              </button>

              <p className="text-sm mt-2">
                <b>Original:</b> {u.originalUrl}
              </p>

              <p className="text-sm mt-1">
                <b>Clicks:</b> {u.clicks}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;