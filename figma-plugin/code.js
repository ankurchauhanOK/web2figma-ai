figma.showUI(__html__, { width: 360, height: 480 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "load-url") {
    // Sample placeholder logic
    figma.closePlugin("Loaded URL: " + msg.url);
  }
};
