
export const fetchData = async (resource: string, idOrSlug?: string) => {
  try {
    const endpoint = `/api/${resource}${idOrSlug ? `/${idOrSlug}` : ""}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${resource}${idOrSlug ? ' (with ID/Slug)' : ''}:`, error);
    return null;
  }
};