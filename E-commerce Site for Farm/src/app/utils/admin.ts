export const ADMIN_EMAILS = [
  'cedricfeyants@gmail.com',
  'francoisderidder1995@gmail.com',
  // Add other admin emails here
];

export const isAdmin = (email?: string | null) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};
