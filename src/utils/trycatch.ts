type CallbackFunction<T> = () => Promise<T>;
type ErrorCallback = (error: Error) => void;

export const tryCatch = async <T>(callback: CallbackFunction<T>, onError?: ErrorCallback): Promise<void> => {
  try {
    await callback();
  } catch (error) {
    if (onError) {
      onError(error as Error);
    }
  }
};
