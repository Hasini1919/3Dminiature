/////////// i use here

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navbar from '@/components/Admin_sidebar/Slidebar';

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

    const data = new FormData();
    data.append('productId', productId as string);
    data.append('title', form.title);
    data.append('mainTitle', form.mainTitle);
    data.append('discountPercentage', form.discountPercentage.toString());
    data.append('expiresAt', form.expiresAt);
    if (form.image) data.append('image', form.image);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5500/api/ads/', {
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
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="pl-72 w-full p-6 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">
                Advertisement Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage promotional content for Product ID: {productId}
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="text-red-800 text-sm">{error}</div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="text-green-800 text-sm">{success}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    {adExists ? 'Update Advertisement' : 'Create New Advertisement'}
                  </h2>
                  {!adExists && (
                    <p className="text-sm text-amber-600 mt-1 bg-amber-50 px-3 py-2 rounded-md">
                      No advertisement currently exists for this product
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Advertisement Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter advertisement title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Title
                      </label>
                      <input
                        type="text"
                        name="mainTitle"
                        placeholder="Enter main title"
                        value={form.mainTitle}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Percentage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="discountPercentage"
                          placeholder="0"
                          value={form.discountPercentage}
                          onChange={handleChange}
                          required
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        name="expiresAt"
                        value={form.expiresAt}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advertisement Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {/* <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, JPEG up to 10MB
                      </p> */}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        adExists ? 'Update Advertisement' : 'Create Advertisement'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-1">
              {/* Current Image Preview */}
              {adExists && imagePath && (
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Current Image</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img
                        src={`http://localhost:5500/images/${imagePath}`}
                        alt="Current Advertisement"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Section */}
              {adExists && (
                <div className="bg-white rounded-lg shadow-sm border border-red-200">
                  {/* <div className="px-6 py-4 border-b border-red-200 bg-red-50">
                    <h3 className="text-lg font-medium text-red-800"></h3>
                  </div> */}
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete,  cannot be recovered.
                    </p>
                    <button
                      onClick={handleDeleteAd}
                      disabled={loading}
                      className="w-full bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        'Delete Advertisement'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAdvertisement;