"use client";
export const fetchSuggestions = async (keywords: string) => {
  // console.log(`fetchSuggestions triggered: ${keywords}`);
  if (keywords.trim() === "") {
    return [];
  }

  try {
    const response = await fetch("/api/map/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ keywords }).toString(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
