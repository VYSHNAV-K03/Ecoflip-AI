import { useState, useRef, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axiosInstance from "../axios";

const wastePoints = {
  plastic: 5,
  glass: 10,
  cardboard: 7,
  paper: 3,
  metal: 8,
  others: 0, // "Others" category with 0 points
};

export default function WasteScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [wasteType, setWasteType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [points, setPoints] = useState(0);
  const [scannedWaste, setScannedWaste] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

  console.log(user);

  const modelURL = "/model.json";
  const metadataURL = "/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.filter = "contrast(120%) brightness(110%)";
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      detectWaste();
    }
  };

  const detectWaste = async () => {
    if (!model) {
      console.error("Model not loaded yet");
      return;
    }

    const imageElement = canvasRef.current;
    let predictionResults = {};

    for (let i = 0; i < 5; i++) {
      const predictions = await model.predict(imageElement);
      predictions.forEach((pred) => {
        predictionResults[pred.className] =
          (predictionResults[pred.className] || 0) + pred.probability;
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    let bestClass = Object.keys(predictionResults).reduce((a, b) =>
      predictionResults[a] > predictionResults[b] ? a : b
    );

    // If the predicted class is not in the wastePoints list, classify it as "others"
    if (!wastePoints[bestClass]) {
      bestClass = "others";
    }

    console.log("Final Prediction:", bestClass);
    setWasteType(bestClass);
    setQuantity(1);
    setPoints(wastePoints[bestClass]); // "others" will automatically get 0 points
  };

  const calculatePoints = (qty) => {
    if (wasteType && wastePoints[wasteType]) {
      setPoints(wastePoints[wasteType] * qty);
    }
  };

  const addToWasteList = () => {
    if (wasteType === "others") {
      alert(
        "This item is categorized as 'Others' and will not be added to the list."
      );
      setWasteType(null);
      setQuantity(1);
      setPoints(0);
      return;
    }

    const newEntry = { type: wasteType, quantity, points };
    setScannedWaste((prev) => {
      const updatedList = [...prev, newEntry].sort(
        (a, b) => b.points - a.points
      );
      setTotalPoints(updatedList.reduce((sum, item) => sum + item.points, 0));
      return updatedList;
    });

    // Reset for next scan
    setWasteType(null);
    setQuantity(1);
    setPoints(0);
  };

  const placeOrder = async () => {
    if (totalPoints < 300) {
      alert(
        "Sorry, not enough points. You need at least 300 points to place an order."
      );
    } else {
      const response = await axiosInstance.post("/materials/add-materials", {
        userId: user._id,
        materials: scannedWaste,
      });
      console.log(response.data);
      alert(`Order placed successfully! Total Points: ${totalPoints}`);
      console.log(scannedWaste);

      setScannedWaste([]);
      setTotalPoints(0);
    }
  };

  // Fetch Pending Materials
  const fetchPendingMaterials = async () => {
    try {
      const response = await axiosInstance.get("/materials/pending-materials");
      // setMaterials(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pending materials:", error);
    }
  };

  useEffect(() => {
    fetchPendingMaterials();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Waste Scanner</h2>
      <div className="d-flex justify-content-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="border rounded"
          width="300"
        ></video>
      </div>
      <canvas
        ref={canvasRef}
        width="300"
        height="200"
        style={{ display: "none" }}
      ></canvas>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={captureImage}>
          Capture & Scan
        </button>
      </div>

      {wasteType && (
        <div className="mt-4 text-center">
          <h4>Detected Waste: {wasteType}</h4>
          <label>Quantity: </label>
          <input
            type="number"
            className="form-control d-inline w-25"
            value={quantity}
            min="1"
            onChange={(e) => {
              const qty = parseInt(e.target.value, 10) || 1;
              setQuantity(qty);
              calculatePoints(qty);
            }}
          />
          <h5 className="mt-2">Total Points for this item: {points}</h5>
          <button className="btn btn-success mt-2" onClick={addToWasteList}>
            Add to List
          </button>
        </div>
      )}

      <div className="mt-4">
        <h3>Scanned Waste List</h3>
        <ul className="list-group">
          {scannedWaste.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.type} - Quantity: {item.quantity} - Points: {item.points}
            </li>
          ))}
        </ul>
        <h4 className="mt-3">Total Points: {totalPoints}</h4>
      </div>

      {scannedWaste.length > 0 && (
        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
