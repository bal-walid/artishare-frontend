function formatArticle(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  // Check if first element is h1
  const firstElement = body.firstElementChild;
  if (firstElement?.tagName === "H1") {
    // Check if next element is h2 and remove it first
    const nextElement = firstElement.nextElementSibling;
    if (nextElement?.tagName === "H2") {
      nextElement.remove();
    }
    // Remove the h1
    firstElement.remove();
  }

  return body.innerHTML;
}

export default formatArticle;
