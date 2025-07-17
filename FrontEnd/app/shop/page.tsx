'use client';

export default function ShopPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to the Shop!
      </h1>
      <p className="text-lg max-w-xl text-center drop-shadow-md">
        Thanks for logging in. Explore our awesome products and enjoy shopping.
      </p>
      <button
        className="mt-8 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 transition"
        onClick={() => alert('Start shopping!')}
      >
        Start Shopping
      </button>
    </main>
  );
}
