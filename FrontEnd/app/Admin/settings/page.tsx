'use client';

import { useRouter } from 'next/navigation';

type SettingSection =
  | 'userManagement'
  | 'security'
  | 'notifications'
  | 'general'
  | 'paymentShipping'
  | 'profile';

const sections: { id: SettingSection; label: string; route: string }[] = [
  {
    id: 'userManagement',
    label: 'User Management & Roles',
    route: '/Admin/usermanage',
  },
  {
    id: 'security',
    label: 'Security Settings',
    route: '/Admin/security',
  },
  {
    id: 'notifications',
    label: 'Notification Settings',
    route: '/Admin/notificationSetting',
  },
  {
    id: 'general',
    label: 'General Settings',
    route: '/Admin/general',
  },
  {
    id: 'paymentShipping',
    label: 'Payment & Shipping Settings',
    route: '/Admin/payment-shipping',
  },
  {
    id: 'profile',
    label: 'Profile Settings',
    route: '/Admin/profile',
  },
];

const SettingsAccordion = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Settings</h1>

      <div className="space-y-5">
        {sections.map(({ id, label, route }) => (
          <div
            key={id}
            className="border border-indigo-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => handleNavigate(route)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
            >
              <span>{label}</span>
              <svg
                className={`w-6 h-6 text-indigo-600 transform transition-transform duration-300`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsAccordion;
