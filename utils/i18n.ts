// Utility functions for internationalization

/**
 * Get localized text from an object with _en and _ar fields
 * @param obj - Object with _en and _ar properties
 * @param language - Current language ('en' | 'ar')
 * @param fallback - Optional fallback value if field doesn't exist
 * @returns Localized text
 */
export function getLocalizedText<T extends Record<string, any>>(
  obj: T | null | undefined,
  language: 'en' | 'ar',
  fallback: string = ''
): string {
  if (!obj) return fallback;
  
  const field = language === 'ar' ? '_ar' : '_en';
  
  // Try the language-specific field first
  if (typeof obj[field] === 'string') {
    return obj[field];
  }
  
  // Fallback to the other language if current one doesn't exist
  const fallbackField = language === 'ar' ? '_en' : '_ar';
  if (typeof obj[fallbackField] === 'string') {
    return obj[fallbackField];
  }
  
  // If neither exists, try direct access (for backward compatibility)
  if (typeof obj === 'string') {
    return obj;
  }
  
  return fallback;
}

/**
 * Recursively get localized text from nested objects
 * Useful for categories with nested products
 */
export function getLocalizedNested<T>(
  data: T | T[] | null | undefined,
  language: 'en' | 'ar',
  fieldName: string
): string {
  if (!data) return '';
  
  if (Array.isArray(data)) {
    return getLocalizedNested(data[0], language, fieldName);
  }
  
  const obj = data as any;
  const fieldKey = `${fieldName}_${language}`;
  const fallbackKey = `${fieldName}_${language === 'ar' ? 'en' : 'ar'}`;
  
  return obj[fieldKey] || obj[fallbackKey] || obj[fieldName] || '';
}
