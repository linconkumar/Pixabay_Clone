import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ImageCard from "./ImageCard";
import Modal from "./Modal";
import "./App.css";

const API_KEY = "51517617-91370c039dc13505ef574a9c1"; // Replace with your own api key

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch images
  const fetchImages = async (query, newPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=30&page=${newPage}`
      );

      const newImages = response.data.hits.map((img, i) => ({
        ...img,
        uniqueId: `${img.id}-${i}`,
      }));

      if (newImages.length === 0) {
        setHasMore(false);
      }

      // Append or replace based on page
      setImages((prev) =>
        newPage === 1 ? newImages : [...prev, ...newImages]
      );
    } catch (err) {
      setError("⚠️ Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load default images on mount
  useEffect(() => {
    fetchImages("nature", 1);
  }, []);

  // Fetch on search
  useEffect(() => {
    if (search.trim() === "") {
      fetchImages("nature", 1);
    } else {
      fetchImages(search, 1);
    }
    setPage(1);
    setHasMore(true);
  }, [search]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchImages(search.trim() || "nature", nextPage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page, search]);

  //  Download image
  const handleDownload = async (url, filename = "pixabay-image.jpg") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("❌ Failed to download image. Please try again.");
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar setSearch={setSearch} />

      {/* Gallery Section */}
      <div className="image-gallery">
        {error && <p className="error">{error}</p>}
        {!loading && images.length === 0 && (
          <p className="no-results">❌ No images found.</p>
        )}

        {images.map((img) => (
          <ImageCard
            key={img.uniqueId}
            image={img}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {loading && <p className="loading">⏳ Loading more images...</p>}
      {!hasMore && <p className="end-msg">No more images available.</p>}

      {/* Modal */}
      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={() =>
            handleDownload(selectedImage.largeImageURL, "pixabay-image.jpg")
          }
        />
      )}
    </div>
  );
};

export default App;
