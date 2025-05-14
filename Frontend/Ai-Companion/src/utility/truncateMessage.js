export const truncateMessage = (message, maxWords = 10) => {
  const words = message.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : message;
};