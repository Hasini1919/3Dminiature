export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const;

/**
 * Get number of days in a month
 * @param month - 1-12 (January = 1)
 * @param year - Full year (e.g., 2023)
 */
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function formatBirthday(dateStr?: string | null): string {
  if (!dateStr) return "";
  
  try {
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateStr}`);
      return "";
    }
    
    const monthIndex = date.getMonth();
    if (monthIndex < 0 || monthIndex >= months.length) {
      console.warn(`Invalid month index: ${monthIndex}`);
      return "";
    }
    
    return `${months[monthIndex]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch (error) {
    console.error("Error formatting birthday:", error);
    return "";
  }
}

interface BirthdayParts {
  year: number;
  month: number; // 0-11
  day: number;
}

export function parseBirthdayParts(dateStr?: string | null): BirthdayParts | null {
  if (!dateStr) return null;
  
  try {
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateStr}`);
      return null;
    }
    
    const monthIndex = date.getMonth();
    if (monthIndex < 0 || monthIndex >= months.length) {
      console.warn(`Invalid month index: ${monthIndex}`);
      return null;
    }
    
    return {
      year: date.getFullYear(),
      month: monthIndex,
      day: date.getDate()
    };
  } catch (error) {
    console.error("Error parsing birthday parts:", error);
    return null;
  }
}

export function createBirthdayString(parts: {
  year: number;
  month: number; // 0-11
  day: number;
}): string {
  try {
    const date = new Date(parts.year, parts.month, parts.day);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error("Error creating birthday string:", error);
    return "";
  }
}