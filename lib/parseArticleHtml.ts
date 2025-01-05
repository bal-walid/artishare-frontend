function parseArticleHtml(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  // Check if first element is h1
  const firstElement = body.firstElementChild;
  const firstH1 = firstElement?.tagName === 'H1' ? (firstElement.textContent || null) : null;

  // Check if next element is h2
  const firstH2AfterH1 = firstH1 && 
    firstElement?.nextElementSibling?.tagName === 'H2' ? 
    firstElement.nextElementSibling.textContent : null;

  // Find all images
  const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);

  return {
    title: firstH1,
    subtitle: firstH2AfterH1,
    images
  };
}

export default parseArticleHtml;