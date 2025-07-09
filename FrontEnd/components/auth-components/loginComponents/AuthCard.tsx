const AuthCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto">
      {children}
    </div>
  );
};

export default AuthCard;
