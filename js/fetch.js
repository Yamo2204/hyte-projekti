// ============================================
// ملف fetch.js - الأداة الرئيسية للتواصل مع Backend
// هذا الملف مهم جداً - يحتوي على الدالة التي ترسل الطلبات
// ============================================

/**
 * دالة لجلب البيانات من Backend API
 * 
 * @param {string} url - عنوان الـ API (مثل: http://localhost:3000/api/users)
 * @param {Object} options - خيارات الطلب (GET, POST, PUT, DELETE)
 * 
 * @returns {Object} البيانات من Backend بصيغة JSON
 */
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
    console.error('fetchData() error:', error.message);
    return { error: error.message || 'Network error' };
  }
};

// نصدّر الدالة لاستخدامها في ملفات أخرى (مثل items.js)
export { fetchData };