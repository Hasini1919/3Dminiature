export function maskEmail(email: string) {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (user.length < 2) return email;
    return `${user[0]}.******@${domain}`;
  }
  
  export function maskEmailForCard(email: string) {
    const [user, domain] = email.split("@");
    if (user.length < 3) return email;
    return `${user.slice(0, 2)}${"*".repeat(user.length - 2)}@${domain}`;
  }