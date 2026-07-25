export const loadModuleContent = async (id: string, language: string): Promise<string> => {
  try {
    // Получаем базовый URL
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // Формируем путь к файлу
    const url = `${baseUrl}modules/${language}/${id}.html`;
    
    console.log('Loading module from:', url); // Для отладки
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Module ${id} in ${language} not found, trying ru...`);
      const fallbackUrl = `${baseUrl}modules/ru/${id}.html`;
      const fallbackResponse = await fetch(fallbackUrl);
      if (!fallbackResponse.ok) {
        throw new Error(`Module ${id} not found in any language`);
      }
      return await fallbackResponse.text();
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Failed to load module ${id}:`, error);
    return '';
  }
};