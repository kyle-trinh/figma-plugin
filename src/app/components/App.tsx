import React from 'react';
import '../styles/ui.css';

function App() {
  const [originalName, setOriginalName] = React.useState('');
  const [expectedName, setExpectedName] = React.useState('');

  const handleReplaceAll = () => {
    if (originalName.trim() === '' || expectedName.trim() === '') {
      return;
    }

    parent.postMessage({ pluginMessage: { type: 'replace-all', from: originalName, to: expectedName } }, '*');
  };

  const handleCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  // Signal to controller that the component has been rendered
  // Ready for communication
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'ready-signal' } }, '*');
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, nodeName } = event.data.pluginMessage;

      if (type === 'nodes-selected') {
        setOriginalName(nodeName);
      }
    };
  }, []);

  return (
    <form>
      <p>Original layer name</p>
      <input value={originalName} onChange={(e) => setOriginalName(e.target.value)} required />
      <p>Expected layer name</p>
      <input value={expectedName} onChange={(e) => setExpectedName(e.target.value)} required />
      <div className="action-btns">
        <button id="create" onClick={handleReplaceAll}>
          Create
        </button>
        <button type="submit" value="submit" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default App;
