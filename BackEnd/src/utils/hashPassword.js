import bcrypt from 'bcrypt';
const run = async () => {
  const plainPassword = "admin123"; 
  const hashedPassword = await bcrypt.hash(plainPassword, 10); 
  console.log("Hashed Password:", hashedPassword); // Output the hashed password
};

run(); 
