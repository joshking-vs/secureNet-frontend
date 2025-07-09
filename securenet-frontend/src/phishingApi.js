export async function checkPhishing(message) {
 try {
   const response = await fetch('http://localhost:8000/api/classify-message/', {
  const response = await fetch('http://localhost:8000/api/classify-message/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API Error');
  }
   return await response.json();
 } catch (err) {
    return { verdict: "Error", confidence: 0, error: err.message };
  }
}
  return await response.json();
}
