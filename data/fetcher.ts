// fetcher.ts
const fetcher = async (route: string, id?: string): Promise<any> => {
  const baseUrl: string = process.env.BACKEND_URL as string;
  const url: string = `${baseUrl}${route}${id ? `/${id}` : ""}`;

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

    return await response.json();
  } catch (error) {
    console.error(
      "Fetch error:",
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
};

export default fetcher;
