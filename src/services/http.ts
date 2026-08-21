export async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch JSON from ${url}: ${response.statusText}`);
  }

  return response.json();
}
