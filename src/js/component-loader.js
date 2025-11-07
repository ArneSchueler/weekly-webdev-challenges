// Lädt HTML-Komponenten dynamisch in die Seite
async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${filePath}:`, error);
  }
}

// Navbar laden
loadComponent("#navbar", "../../src/components/navbar/navbar.html");
