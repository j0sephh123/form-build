import { useState } from "react";
import "./FormBuilder.css";
import { useFormStore } from "./store/useFormStore";
import type { FormField } from "./store/useFormStore";

function App() {
  const { fields, addField, removeField } = useFormStore();
  const [currentField, setCurrentField] = useState({
    label: "Username",
    placeholder: "Enter your username",
  });

  console.log(fields);
  

  const generateId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.floor(Math.random() * 1000).toString(36);
    return `${timestamp}-${random}`;
  };

  const handleConfigChange = (
    field: keyof typeof currentField,
    value: string
  ) => {
    setCurrentField((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddField = () => {
    if (!currentField.label.trim()) return;

    const newField = {
      id: generateId(),
      label: currentField.label.trim(),
      placeholder: currentField.placeholder.trim(),
      type: "text",
    };

    console.log(newField);
    

    addField(newField);
    setCurrentField({
      label: "",
      placeholder: "",
    });
  };

  const generateCode = () => {
    return fields
      .map(
        (field: FormField) => `<>
  <label htmlFor="${field.id}">${field.label}</label>
  <input
    type="${field.type}"
    id="${field.id}"
    placeholder="${field.placeholder}"
  />
</>`
      )
      .join("\n");
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generateCode())
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy code:", err));
  };

  return (
    <div className="form-builder">
      <div className="panel">
        <h2 className="panel-title">Configuration</h2>
        <div className="config-input">
          <label htmlFor="labelInput">Label:</label>
          <input
            type="text"
            id="labelInput"
            value={currentField.label}
            onChange={(e) => handleConfigChange("label", e.target.value)}
          />
        </div>
        <div className="config-input">
          <label htmlFor="placeholderInput">Placeholder:</label>
          <input
            type="text"
            id="placeholderInput"
            value={currentField.placeholder}
            onChange={(e) => handleConfigChange("placeholder", e.target.value)}
          />
        </div>
        <button onClick={handleAddField}>Add Field</button>
      </div>

      <div className="panel">
        <h2 className="panel-title">Preview</h2>
        <div className="preview-container">
          {fields.map((field: FormField) => (
            <div key={field.id} className="field-container">
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
              />
              <button
                className="remove-button"
                onClick={() => removeField(field.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

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
