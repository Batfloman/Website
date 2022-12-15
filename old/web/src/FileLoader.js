export default async function loadContent(contentURL) {
  let content;
  await fetch(contentURL)
    .then((response) => response.json())
    .then((data) => (content = data))
  return content;
}
