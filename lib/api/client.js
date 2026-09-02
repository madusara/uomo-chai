
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function apiFetch(endpoint, options = {}) {

  // console.log("Fetching API:", `${API_BASE_URL}${endpoint}`);

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    next: options.next || { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `API fetch failed: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }

  return res.json();
}