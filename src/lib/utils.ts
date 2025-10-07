// Função para converter uma string de camelCase para snake_case
const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// Função recursiva para converter as chaves de um objeto de camelCase para snake_case
export const camelToSnake = (obj: any): any => {
  // Se não for um objeto (ou for nulo ou uma data), retorna o valor original
  if (obj === null || typeof obj !== 'object' || obj instanceof Date) {
    return obj;
  }

  // Se for um array, aplica a função a cada item
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }

  // Se for um objeto, converte suas chaves
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = toSnakeCase(key);
    const value = obj[key];
    // A chave só é adicionada se o valor não for undefined
    if (value !== undefined) {
      acc[newKey] = camelToSnake(value); // Chamada recursiva para o valor
    }
    return acc;
  }, {} as { [key: string]: any });
};

// Função para converter uma string de snake_case para camelCase
const toCamelCase = (str: string) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

// Função recursiva para converter as chaves de um objeto de snake_case para camelCase
export const snakeToCamel = (obj: any): any => {
    // Se não for um objeto (ou for nulo ou uma data), retorna o valor original
    if (obj === null || typeof obj !== 'object' || obj instanceof Date) {
        return obj;
    }

    // Se for um array, aplica a função a cada item
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    }

    // Se for um objeto, converte suas chaves
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = toCamelCase(key);
        const value = obj[key];
        if (value !== undefined) {
            acc[newKey] = snakeToCamel(value); // Chamada recursiva para o valor
        }
        return acc;
    }, {} as { [key: string]: any });
};

// Função para obter valor aninhado de um objeto de forma segura
export const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
