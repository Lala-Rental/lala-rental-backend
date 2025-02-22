type CallbackFunction<T> = () => Promise<T>;
type ErrorCallback = (error: Error) => void;

export const tryCatch = async <T>(callback: CallbackFunction<T>, onError?: ErrorCallback): Promise<any> => {
  try {
    return await callback();
  } catch (error) {
    if (onError) {
      return onError(error as Error);
    }
  }
};
