import React from 'react';

import '../styles/ui.css';

function App() {
  const [originalName, setOriginalName] = React.useState('');
  const [expectedName, setExpectedName] = React.useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState('');

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

      if (type === 'node-selected') {
        setOriginalName(nodeName);
      }
    };
  }, []);

  // A hook to debounce the input value
  // It waits 500ms after user inputs value to perform nodes finding and selection
  React.useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchValue(originalName);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [originalName]);

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'select-nodes', value: debouncedSearchValue } }, '*');
  }, [debouncedSearchValue]);

  return (
    <form>
      <p>Original layer name</p>
      <input value={originalName} required onChange={(e) => setOriginalName(e.target.value)} />
      <p>Expected layer name</p>
      <input value={expectedName} required onChange={(e) => setExpectedName(e.target.value)} />
      <div className="action-btns">
        <button id="create" onClick={handleReplaceAll}>
          Create
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default App;
