export async function checkPhishing(message) {
  const response = await fetch('http://localhost:8000/api/classify-message/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return await response.json();
}
