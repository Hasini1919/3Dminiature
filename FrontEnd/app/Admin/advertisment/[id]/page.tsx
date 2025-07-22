'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const SetAdvertisement = () => {
  const { id: productId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    mainTitle: '',
    discountPercentage: 0,
    image: null as File | null,
    expiresAt: '',
  });
  const [imagePath, setImagePath] = useState('');
  const [adExists, setAdExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAdStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/ads/${productId}`);
        const data = await res.json();

        if (res.ok && data.advertisement) {
          setAdExists(true);
          setForm({
            title: data.advertisement.title,
            mainTitle: data.advertisement.mainTitle,
            discountPercentage: data.advertisement.discountPercentage,
            image: null,
            expiresAt: data.advertisement.expiresAt?.slice(0, 10) || '',
          });

          setImagePath(data.advertisement.img);
        } else {
          setAdExists(false);
        }
      } catch {
        setError('Failed to fetch advertisement info');
      }
    };

    fetchAdStatus();
  }, [productId]);



  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'discountPercentage' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.image && !adExists) {
      setError('Image is required');
      return;
    }

    const data = new FormData();
    data.append('productId', productId as string);
    data.append('title', form.title);
    data.append('mainTitle', form.mainTitle);
    data.append('discountPercentage', form.discountPercentage.toString());
    data.append('expiresAt', form.expiresAt);
    if (form.image) data.append('image', form.image);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5500/api/ads', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess('Advertisement saved successfully!');
        setAdExists(true);
        setForm({
          title: '',
          mainTitle: '',
          discountPercentage: 0,
          image: null,
          expiresAt: "",
        });

        // Redirect to product list after 1 second
        setTimeout(() => {
          router.push('/Admin/Product/Table');
        }, 1000);
      } else {
        setError(result.message || 'Failed to save advertisement');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAd = async () => {
    setError('');
    setSuccess('');
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5500/api/ads/${productId}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess('Advertisement removed successfully!');
        setAdExists(false);
        setForm({
          title: '',
          mainTitle: '',
          discountPercentage: 10,
          image: null,
          expiresAt: "",
        });

        // Redirect to product list after 1 second
        setTimeout(() => {
          router.push('/Admin/Product/Table');
        }, 1000);
      } else {
        setError(result.message || 'Failed to remove advertisement');
      }
    } catch {
      setError('Failed to remove advertisement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Advertisement Manager
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      {!adExists && (
        <div className="mb-6 p-3 text-center bg-yellow-100 text-yellow-800 rounded">
          No advertisement exists for this product yet.
        </div>
      )}

      <div className="mb-10 border p-4 rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {adExists ? 'Update Advertisement' : 'Create Advertisement'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="mainTitle"
            placeholder="Main Title"
            value={form.mainTitle}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage"
            value={form.discountPercentage}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Saving...' : adExists ? 'Update Advertisement' : 'Save Advertisement'}
          </button>
        </form>
      </div>

      {adExists && imagePath && (
        <div className="mt-4">
          <p className="text-gray-600 mb-2">Current Advertisement Image:</p>
          <img
            src={`http://localhost:5500/images/${imagePath}`}
            alt="Advertisement"
            className="w-full max-w-sm rounded"
          />
        </div>
      )}

      {adExists && (
        <div className="border-t pt-6 mt-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4 text-center">
            Remove Existing Advertisement
          </h2>
          <button
            onClick={handleDeleteAd}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Advertisement'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SetAdvertisement;
