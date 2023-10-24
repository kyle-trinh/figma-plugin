const selectedNodes = figma.currentPage.selection;

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
    figma.currentPage
      .findAll((node) => node.name.trim().includes(from.trim()))
      .forEach((node) => {
        node.name = node.name.replace(from, to);
      });

    figma.notify('Finished replacing');

    figma.closePlugin();
  }

  if (msg.type === 'ready-signal') {
    figma.ui.postMessage({
      type: 'nodes-selected',
      nodeName: selectedNodes[0]?.name || '',
    });
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
