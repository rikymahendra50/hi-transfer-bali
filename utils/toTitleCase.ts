export default function (string: string) {
    if (!string) return "-"
    return string
        .replace(/[_-]/g, ' ') // Replace underscores or hyphens with spaces
        .split(' ')            // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' ');
}