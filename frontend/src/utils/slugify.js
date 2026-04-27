export const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // remove special chars
    .replace(/\s+/g, "-");