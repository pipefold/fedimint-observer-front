// Fetch data from a specified route with optional ID
const fetcher = async (route: string, id?: string): Promise<any> => {
  const baseUrl: string = process.env.BACKEND_URL as string; // Ensure baseUrl is a string
  const url: string = `${baseUrl}${route}${id ? `/${id}` : ""}`; // Construct URL with optional ID

  try {
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Parse JSON response and return
  } catch (error) {
    console.error(
      "Fetch error:",
      error instanceof Error ? error.message : String(error)
    ); // Log any errors
    return null;
  }
};

export default fetcher;
