export const createError = (statusCode: number, errorCode: string, errorDescription: string) => {
  return {
    statusCode,
    error_code: errorCode,
    error_description: errorDescription,
  };
};
