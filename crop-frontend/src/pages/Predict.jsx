import { useState } from "react";
import Chatbot from "../components/Chatbot";
import Headlines from "../components/Headlines";

const Predict = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "Prediction failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Prediction failed. Please ensure backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4
      bg-gradient-to-br from-[var(--firstgradient)] via-[var(--secondgradient)] to-[var(--thirdgradient)] pb-12">

      {/* Headlines */}
      <div className="w-full max-w-[1200px] mt-24">
        <Headlines />
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-[1200px] mt-6 flex flex-col lg:flex-row gap-6">

        {/* LEFT : UPLOAD CARD */}
        <div className="flex justify-center items-center w-full lg:w-1/2
          bg-white/20 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-6">

          <div
            className="w-full max-w-[440px] rounded-xl p-6 flex flex-col items-center space-y-4"
            style={{
              backgroundColor: "var(--secondgradient)",
              color: "var(--text)",
              boxShadow: "var(--shadowing)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >

            {/* Title */}
            <div className="flex flex-col items-center text-center">
              <h1
                className="text-xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Upload Leaf Image
              </h1>

              <p className="text-sm opacity-80 mt-1">
                Upload a plant leaf image to analyze disease and health status
              </p>
            </div>

            {/* Upload Box */}
            <label
              htmlFor="file-upload"
              className="w-full h-[120px] border-2 border-dashed rounded-lg
                flex flex-col justify-center items-center cursor-pointer hover:border-green-600 transition"
              style={{ borderColor: "var(--secondary-color)" }}
            >
              {file ? (
                <div className="text-center px-2">
                  <p className="text-sm font-semibold text-green-700 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div className="text-center px-2">
                  <p className="text-sm font-medium opacity-80">
                    Click or drag image to upload
                  </p>
                  <p className="text-xs opacity-60 mt-1">Supports PNG, JPG, JPEG</p>
                </div>
              )}

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Predict Button */}
            <button
              disabled={!file || loading}
              onClick={handleUpload}
              className="w-full py-3 rounded-lg font-semibold transition text-white"
              style={{
                backgroundColor: "var(--secondary-color)",
                opacity: !file || loading ? 0.5 : 1,
                cursor: !file || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Analyzing Leaf Image..." : "Predict Disease"}
            </button>

            {/* Prediction Result Display */}
            {result && result.success && (
              <div
                className="w-full p-4 rounded-lg text-center mt-2 shadow-inner"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--secondary-color)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className="text-base font-bold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    🌿 Diagnostic Result
                  </h2>

                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                      result.status === "Healthy"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>

                <p className="text-sm text-gray-800 text-left">
                  <strong>Crop:</strong> {result.crop || "Unknown Crop"}
                </p>

                <p className="text-sm text-gray-800 text-left mt-1">
                  <strong>Condition:</strong> {result.disease}
                </p>

                <p className="text-sm text-gray-800 text-left mt-1">
                  <strong>Confidence:</strong> {result.confidence}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT : AI ADVISOR */}
        <div className="w-full lg:w-1/2 flex justify-center items-center
          bg-white/20 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-6">

          <div className="flex flex-col items-center w-full">

            <div className="flex flex-col items-center justify-center
              p-4 bg-white/30 backdrop-blur-xl border border-white/30
              rounded-2xl shadow-sm text-center mb-4 w-full">

              <h1 className="text-xl md:text-2xl font-bold text-[#065f46]">
                AgroVision AI Advisor
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Ask any questions regarding crop diseases, treatment, or farming tips
              </p>

            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center w-full gap-4">
              <Chatbot />

              <img
                src="/advisor.png"
                alt="Advisor"
                className="w-[100px] md:w-[140px]
                transition-transform duration-300
                hover:-rotate-3 hover:scale-105 hidden sm:block"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Predict;