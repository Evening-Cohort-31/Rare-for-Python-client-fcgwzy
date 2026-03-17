export const HumanDate = ({ date }) => {
  // Replace hyphens with slashes to ensure cross-browser compatibility
  const dateObj = new Date(date.replace(/-/g, '\/'))

  return dateObj.toLocaleString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago'
  })
}
