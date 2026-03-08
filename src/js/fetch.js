const BACKEND_ORIGIN = 'http://localhost:3000';

const resolveApiUrl = (url) => {
  if (typeof url === 'string' && url.startsWith('/api')) {
    return `${BACKEND_ORIGIN}${url}`;
  }

  return url;
};

const fetchData = async (url, options = {}) => {
  const targetUrl = resolveApiUrl(url);

  try {
    const response = await fetch(targetUrl, options);
    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || data.error || `HTTP ${response.status}` };
    }

    return data;
  } catch (error) {
    return { error: error.message || 'Network error' };
  }
};

export { fetchData };
