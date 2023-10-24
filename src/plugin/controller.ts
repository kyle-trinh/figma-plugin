const selectedNodes = figma.currentPage.selection;

// Initially, 1 selection is enough
// We could use its name to find others with the same name
if (selectedNodes.length > 1) {
  figma.notify('Please select 1 layer only!');

  figma.closePlugin();
}

figma.showUI(__html__, {
  title: 'Replace All',
  height: 250,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'replace-all') {
    const { from, to } = msg;
    const selectedNodes = figma.currentPage.selection;

    // In case no layer was found
    if (selectedNodes.length === 0) {
      figma.notify('No layers found! So, nothing was replaced!');
      figma.closePlugin();
    }

    // Proceed replacing if there are more than 1 layers selected
    selectedNodes.forEach((node) => {
      node.name = node.name.replace(from, to);
    });

    figma.notify('Finished replacing');

    figma.closePlugin();
  }

  if (msg.type === 'ready-signal') {
    figma.ui.postMessage({
      type: 'node-selected',
      nodeName: selectedNodes[0]?.name || '',
    });
  }

  if (msg.type === 'select-nodes') {
    figma.skipInvisibleInstanceChildren = true;
    if (msg.value !== '') {
      figma.currentPage.selection = figma.currentPage.findAll((node) => node.name.trim().includes(msg.value.trim()));
    }
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
