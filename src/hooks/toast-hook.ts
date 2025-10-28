import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3000,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 5000,
    });
  }

  const showInfo = (message: string) => {
    toast(message, {
      duration: 3000,
    });
  }

  return { showSuccess, showInfo, showError };
}