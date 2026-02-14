const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || data.error || 'Request failed' };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export { fetchData };
