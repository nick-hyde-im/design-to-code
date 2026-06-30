figma.showUI(__html__, { width: 400, height: 560 });

const RELAY_URL = "http://localhost:4000";
const FIGMA_API_BASE = "https://api.figma.com/v1";

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === "ready") {
      const savedToken = await figma.clientStorage.getAsync("figmaToken");
      figma.ui.postMessage({ type: "init", figmaToken: savedToken || "" });
      return;
    }

    if (msg.type === "push") {
      const figmaToken = (msg.figmaToken || "").trim();
      if (!figmaToken) {
        figma.ui.postMessage({
          type: "error",
          message: "Enter your Figma personal access token first.",
        });
        return;
      }

      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        figma.ui.postMessage({
          type: "error",
          message: "Nothing selected. Select a frame or component on the canvas.",
        });
        return;
      }

      const fileKey = figma.fileKey;
      if (!fileKey) {
        figma.ui.postMessage({
          type: "error",
          message: "Couldn't read the file key. Open the plugin from a saved Figma file.",
        });
        return;
      }

      // Persist the token so the user doesn't have to re-enter it next time.
      await figma.clientStorage.setAsync("figmaToken", figmaToken);

      const node = selection[0];
      const componentName = toComponentName(node.name);

      figma.ui.postMessage({ type: "loading", message: "Fetching node from Figma..." });
      const nodeTree = await fetchNodeDocument(fileKey, node.id, figmaToken);

      figma.ui.postMessage({ type: "loading", message: "Sending to relay..." });
      const result = await sendToRelay(componentName, nodeTree);

      if (result.success) {
        figma.ui.postMessage({ type: "done", code: result.code, componentName });
      } else {
        figma.ui.postMessage({ type: "error", message: result.error });
      }
    }
  } catch (error) {
    figma.ui.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Convert a Figma layer name into a valid PascalCase React component name.
function toComponentName(rawName) {
  const pascal = (rawName || "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const valid = pascal.replace(/^[^a-zA-Z]+/, "");
  return valid || "GeneratedComponent";
}

// Fetch the REST API "document" object for the selected node — the same nodeTree
// shape described in the README (the first node returned by the Figma API).
async function fetchNodeDocument(fileKey, nodeId, figmaToken) {
  const url = `${FIGMA_API_BASE}/files/${encodeURIComponent(fileKey)}/nodes?ids=${encodeURIComponent(nodeId)}`;
  const response = await fetch(url, { headers: { "X-Figma-Token": figmaToken } });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const nodes = data.nodes || {};
  const entry = nodes[nodeId] || nodes[Object.keys(nodes)[0]];
  if (!entry || !entry.document) {
    throw new Error("Figma API did not return a document for the selected node.");
  }
  return entry.document;
}

async function sendToRelay(componentName, nodeTree) {
  try {
    const response = await fetch(`${RELAY_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ componentName, nodeTree }),
    });

    if (!response.ok) {
      let detail = `Server error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        detail = errorData.error || detail;
      } catch (_) {
        // Response had no JSON body.
      }
      return { success: false, error: detail };
    }

    const data = await response.json();
    return { success: true, code: data.code };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to connect to the relay on :4000.",
    };
  }
}
