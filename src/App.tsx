import { useState } from "react";
import "./FormBuilder.css";

interface FormConfig {
  label: string;
  placeholder: string;
}

function App() {
  const [config, setConfig] = useState<FormConfig>({
    label: "Username",
    placeholder: "Enter your username",
  });

  const handleConfigChange = (field: keyof FormConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateCode = () => {
    return `<>
  <label htmlFor="previewInput">${config.label}</label>
  <input
    type="text"
    id="previewInput"
    placeholder="${config.placeholder}"
  />
</>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generateCode())
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy code:", err));
  };

  return (
    <div className="form-builder">
      {/* Configuration Panel */}
      <div className="panel">
        <h2 className="panel-title">Configuration</h2>
        <div className="config-input">
          <label htmlFor="labelInput">Label:</label>
          <input
            type="text"
            id="labelInput"
            value={config.label}
            onChange={(e) => handleConfigChange("label", e.target.value)}
          />
        </div>
        <div className="config-input">
          <label htmlFor="placeholderInput">Placeholder:</label>
          <input
            type="text"
            id="placeholderInput"
            value={config.placeholder}
            onChange={(e) => handleConfigChange("placeholder", e.target.value)}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="panel">
        <h2 className="panel-title">Preview</h2>
        <div className="preview-container">
          <label htmlFor="previewInput">{config.label}</label>
          <input
            type="text"
            id="previewInput"
            placeholder={config.placeholder}
          />
        </div>
      </div>

      {/* Code Output Panel */}
      <div className="panel">
        <h2 className="panel-title">Generated Code</h2>
        <pre className="code-output">
          <code>{generateCode()}</code>
        </pre>
        <button className="copy-button" onClick={handleCopyCode}>
          Copy Code
        </button>
      </div>
    </div>
  );
}

export default App;
