import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function toBase64(file, callback) {
  const reader = new FileReader();

  reader.onloadend = () => {
    // Call the callback function with the result
    callback(reader.result);
  };

  reader.onerror = (error) => {
    console.error("Error occurred reading file:", error);
    callback(null);
  };

  reader.readAsDataURL(file);
}

export function toPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}
