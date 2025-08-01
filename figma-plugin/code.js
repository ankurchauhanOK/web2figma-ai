figma.showUI(__html__, { width: 360, height: 480 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "load-url") {
    // 👇 You can later connect this to Puppeteer API or external processing
    figma.closePlugin("🔗 Loaded URL: " + msg.url);
  }

  if (msg.type === "load-schema") {
    try {
      // 👇 Replace this dummy schema with your real JSON layout
      const schema = {
        id: 1,
        type: "FRAME",
        name: "Web2Figma Layout",
        layoutMode: "VERTICAL",
        counterAxisSizingMode: "AUTO",
        primaryAxisSizingMode: "AUTO",
        itemSpacing: 24,
        children: [
          {
            type: "TEXT",
            characters: "🔧 Auto-generated UI",
            style: { fontSize: 24 },
            layoutAlign: "INHERIT"
          },
          {
            type: "RECTANGLE",
            name: "Placeholder",
            fills: [{ type: "SOLID", color: { r: 0.2, g: 0.6, b: 0.8 } }],
            layoutAlign: "INHERIT",
            resize: [200, 100]
          }
        ]
      };

      const node = figma.createNodeFromJSON(schema);
      figma.currentPage.appendChild(node);
      figma.viewport.scrollAndZoomIntoView([node]);
      figma.closePlugin("✅ Layout rendered from schema");
    } catch (err) {
      console.error("❌ Failed to load schema:", err);
      figma.closePlugin("❌ Error loading layout");
    }
  }
};
