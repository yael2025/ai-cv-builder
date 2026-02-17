const BASE_URL = "http://localhost:3001";

export const saveCv = async (cvData) => {
  const response = await fetch(`${BASE_URL}/api/cv/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cvData }),
  });

  if (!response.ok) {
    throw new Error("Failed to save CV");
  }

  return response.json();
};

export const getCv = async () => {
  const response = await fetch(`${BASE_URL}/api/cv`);

  if (!response.ok) {
    throw new Error("No CV found");
  }

  return response.json();
};

export const improveSummary = async (summary) => {
  const response = await fetch(
    `${BASE_URL}/api/improve-summary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to improve summary");
  }

  const data = await response.json();

  return data.improvedText;   
};



export const improveExperience = async (description) => {
  const response = await fetch(
    `${BASE_URL}/api/improve-experience`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to improve experience");
  }

  const data = await response.json();

  return data.improvedText;
};
