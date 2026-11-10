// src/lib/environment.ts
let data: any = null;

export const loadHierarchy = async () => {
  if (data) return data;
  const res = await fetch('/environmentDb.json');
  if (!res.ok) throw new Error('Failed to load hierarchy.json');
  data = await res.json();
  return data;
};

export const getCurrentHierarchy = () => {
  if (!data) return null;
  const envId = data.currentEnvironmentID;
  return data.hierarchies[envId] || [];
};