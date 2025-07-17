import bcrypt from 'bcrypt';

// Async function to hash a plain text password
const run = async () => {
  const plainPassword = "admin123"; // Replace this with your desired admin password
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 is the salt rounds
  console.log("Hashed Password:", hashedPassword); // Output the hashed password
};

run(); // Execute the function
