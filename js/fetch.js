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
const fetchData = async (url, options = {}) => {
  try {
    // ======== نرسل الطلب إلى Backend ========
    // fetch() - دالة مدمجة في JavaScript ترسل HTTP requests
    const response = await fetch(url, options);

    // ======== نتحقق من نجاح الطلب ========
    // response.ok = true إذا كان status code 200-299
    if (!response.ok) {
      // إذا فشل الطلب (مثل 404, 500)
      const errorData = await response.json();
      return { error: errorData.message || 'An error occurred' };
    }
    
    // ======== إذا نجح الطلب، نرجع البيانات ========
    return await response.json(); // نحول الرد من JSON إلى JavaScript Object
    
  } catch (error) {
    // ======== التعامل مع أخطاء الاتصال ========
    // مثل: Backend مطفي، أو لا يوجد إنترنت
    console.error('fetchData() error:', error.message);
    return { error: error.message };
  }
};

// نصدّر الدالة لاستخدامها في ملفات أخرى (مثل items.js)
export { fetchData };