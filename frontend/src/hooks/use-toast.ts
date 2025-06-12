
export const toggleDarkMode = (enable: boolean) => {
  const html = document.documentElement;
  if (enable) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

export function useToast() {
  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    const message = `${title}${description ? `\n\n${description}` : ""}`;

    const toastContainer = document.createElement("div");
    toastContainer.textContent = message;
    toastContainer.className = `fixed bottom-4 right-4 px-4 py-2 rounded shadow-md z-50 text-sm font-semibold text-white ${
      variant === "destructive" ? "bg-red-600" : "bg-green-600"
    }`;
    document.body.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.remove();
    }, 3000);
  };

  return { toast };
}

