export const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await res.json();
    } catch (error) {
      console.log("[categories_GET]", error);
      return [];
    }
  };
  
  export const fetchCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      return await res.json();
    } catch (error) {
      console.log("[collections_GET]", error);
      return [];
    }
  };