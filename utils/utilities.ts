export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: false,
  };
  const formattedDate = date.toLocaleString("en-IN", options).replace(",", "");
  return formattedDate.split("-").join(" ");
};
