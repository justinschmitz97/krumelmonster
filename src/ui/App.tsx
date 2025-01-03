import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "../tailwind.css";

const App = () => {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Auto Functional Cookies
      </h1>
      <p className="text-lg text-gray-500">
        Manage cookie preferences with ease.
      </p>
    </div>
  );
};

// Get the root DOM element
const container = document.getElementById("root");

// Ensure "container" is not null
if (!container) {
  throw new Error("Root container not found in the DOM.");
}

// Create a root using React 18's createRoot method
const root = createRoot(container);

// Render the App component
root.render(<App />);

export default App;
