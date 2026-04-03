import { useState } from "react";
import Chatbot from "../components/Chatbot";
import Headlines from "../components/Headlines";

const Predict = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4
      bg-gradient-to-br from-[var(--firstgradient)] via-[var(--secondgradient)] to-[var(--thirdgradient)]">

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
            className="w-full max-w-[400px] rounded-xl p-6 flex flex-col items-center space-y-4"
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
                className="text-lg font-semibold"
                style={{ color: "var(--primary-color)" }}
              >
                Upload Leaf Image
              </h1>

              <p className="text-sm opacity-70 mt-1">
                Upload a plant leaf image to detect disease
              </p>
            </div>

            {/* Upload */}
            <label
              htmlFor="file-upload"
              className="w-full h-[100px] border-2 border-dashed rounded-lg
                flex flex-col justify-center items-center cursor-pointer"
              style={{ borderColor: "var(--secondary-color)" }}
            >
              {file ? (
                <p className="text-sm text-center">{file.name}</p>
              ) : (
                <p className="text-sm opacity-60 text-center">
                  Click or drag image to upload
                </p>
              )}

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Button */}
            <button
              disabled={!file || loading}
              onClick={handleUpload}
              className="w-full py-2 rounded-lg font-medium transition"
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "#ffffff",
                opacity: !file || loading ? 0.5 : 1,
                cursor: !file || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Analyzing..." : "Predict Disease"}
            </button>

            {/* Result */}
            {result && result.success && (
              <div
                className="w-full p-4 rounded-lg text-center"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  border: "1px solid var(--secondary-color)",
                }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--primary-color)" }}
                >
                  🌿 Prediction Result
                </h2>

                <p className="mt-2">
                  <strong>Disease:</strong> {result.disease}
                </p>

                <p className="mt-1">
                  <strong>Confidence:</strong>{" "}
                  {Number(result.confidence).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT : AI ADVISOR */}
        <div className="w-full lg:w-1/2 flex justify-center items-center
          bg-white/20 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-6">

          <div className="flex flex-col items-center">

            <div className="flex flex-col items-center justify-center
              p-6 bg-white/20 backdrop-blur-xl border border-white/30
              rounded-2xl shadow-xl text-center">

              <h1 className="text-xl md:text-3xl font-bold text-[#065f46]">
                Hi, I am
              </h1>

              <h1 className="text-xl md:text-3xl font-bold text-[#065f46]">
                ArgoVision AI Advisor
              </h1>

            </div>

            <div className="flex items-end mt-6 gap-3">
              <Chatbot />

              <img
                src="/advisor.png"
                alt="Advisor"
                className="w-[120px] md:w-[160px]
                transition-transform duration-300
                hover:-rotate-3 hover:scale-105"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Predict;