"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "@/services/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FormErrors {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  Provience?: string;
  City?: string;
  Area?: string;
  District?: string;
  HouseNo?: string;
}

const BillingForm = () => {
  const {
    address,
    setAddress,
    setActive,
    setIsAddressComplete,
    billingCities,
    setBillingCities,
    billingDistricts,
    setBillingDistricts,
  } = useAppContext();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 6.9271, lng: () => 79.8612 },
      radius: 20 * 1000,

      componentRestrictions: { country: "lk" },
    },
    debounce: 300,
  });

  useEffect(() => {
    if (address.Area) {
      setValue(address.Area, false);
    }
  }, [address.Area, setValue]);

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setAddress({ ...address, Area: e.target.value });
  };
  const handleAreaSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();
    setAddress({ ...address, Area: description });
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchuserAddress = async () => {
     try {
    const response = await axiosInstance.get("/api/user/get-address");
    if (response.data.success && response.data.address) {
      const fetchedAddress = { ...response.data.address };
      setAddress(fetchedAddress);

      // load Districts and Cities based on saved address
      if (fetchedAddress.Provience) {
        const districtResponse = await axiosInstance.get("/api/getDistricts", {
          params: { province: fetchedAddress.Provience },
        });
        if (districtResponse.data.success) {
          setBillingDistricts([...districtResponse.data.districts]);
        }

        if (fetchedAddress.District) {
          const cityResponse = await axiosInstance.get("/api/getCities", {
            params: { district: fetchedAddress.District },
          });
          if (cityResponse.data.success) {
            setBillingCities([...cityResponse.data.cities]);
          }
        }
      }
    }
  } catch (err) {
    console.error("Fetch user address error:", err);
    toast.error("Failed to fetch saved address.");
  } finally {
    setIsLoading(false);
  }
  };

  const handleBillingProvinceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProvince = e.target.value;
    setAddress({
      ...address,
      Provience: selectedProvince,
      District: "",
      City: "",
    });

    try {
      const response = await axiosInstance.get("/api/getDistricts", {
        params: { province: selectedProvince },
      });
      if (response.data.success) {
        setBillingDistricts([...response.data.districts]);
      } else {
        setBillingCities([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleBillingDistrictChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDistrict = e.target.value;
    setAddress({ ...address, District: selectedDistrict, City: "" });

    try {
      const response = await axiosInstance.get("/api/getCities", {
        params: { district: selectedDistrict },
      });
      if (response.data.success) {
        setBillingCities([...response.data.cities]);
      } else {
        setBillingCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    // Simple email pattern
    
    const HousePattern = /^(?=.*\d).{3,}$/;
    // Check if phone number is all digits and at least 10 digits
    const isValidPhoneNumber =/^(0)(7[0-9])[0-9]{7}$/.test(address.PhoneNumber);
    const isHouseValid = HousePattern.test(address.HouseNo);
    

    if (address.FirstName) {
      setErrors((prev) => ({ ...prev, FirstName: "" }));
    }
    if (address.LastName) {
      setErrors((prev) => ({ ...prev, LastName: "" }));
    }
    if (address.PhoneNumber) {
      setErrors((prev) => ({ ...prev, PhoneNumber: "" }));
    }
   
    if (address.Provience) {
      setErrors((prev) => ({ ...prev, Provience: "" }));
    }
    if (address.District) {
      setErrors((prev) => ({ ...prev, District: "" }));
    }
    if (address.City) {
      setErrors((prev) => ({ ...prev, City: "" }));
    }
    if (address.HouseNo) {
      setErrors((prev) => ({ ...prev, HouseNo: "" }));
    }
    if (address.Area) {
      setErrors((prev) => ({ ...prev, Area: "" }));
    }

    const isComplete = Boolean(
      address.FirstName &&
        address.LastName &&
        isValidPhoneNumber &&
        address.Provience &&
        address.District &&
        address.City &&
        isHouseValid &&
        address.Area
    );
    if (!isComplete) {
    }
    setIsAddressComplete(isComplete);
  }, [address, setIsAddressComplete]);

  useEffect(() => {
    fetchuserAddress();
  }, []);

  const validateForm = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.get("FirstName")) {
      newErrors.FirstName = "First name is required";
    }
    if (!formData.get("LastName")) {
      newErrors.LastName = "Last name is required";
    }
    if (!formData.get("PhoneNumber")) {
      newErrors.PhoneNumber = "PhoneNumber is required";
    } else if (!/^(0)(7[0-9])[0-9]{7}$/.test(formData.get("PhoneNumber") as string)) {
      newErrors.PhoneNumber = "Phone number must be  exactly 10 digits and correct format";
    }

    if (!formData.get("Provience")) {
      newErrors.Provience = "Province is required";
    }
    if (!formData.get("District")) {
      newErrors.District = "District is required";
    }

    if (!formData.get("City")) {
      newErrors.City = "City is required";
    }
    if (!formData.get("Area")) {
      newErrors.Area = "Address is required";
    }

    if (!formData.get("HouseNo")) {
      newErrors.HouseNo = "House No / Street No is required";
    } else if (!/^(?=.*\d).{2,}$/.test(formData.get("HouseNo") as string)) {
      newErrors.HouseNo =
        "This field must contain at least 2 or more characters and include a number";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsAddressComplete(true);
      setActive("shipping Address");
    } else {
      setIsAddressComplete(false);
    }
  };

  const getInputClass = (field: keyof FormErrors) =>
    `w-full px-3 py-2.5 focus:border-[#cb1a2e] border ${
      errors[field] ? "border-red-700" : "border-gray-300"
    } outline-none rounded text-gray-500`;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
       <AiOutlineLoading3Quarters className="animate-spin text-4xl"/>
      </div>
    );
  }

  return (
    <form className="w-full space-y-6 " onSubmit={handleSubmit}>
      

      <div className="flex gap-3 w-full justify-between">
        <ToastContainer />
        <div className="w-[48%]">
          <label htmlFor="FirstName" className="mb-1.5 block ">FirstName</label>
          <input
            className={getInputClass("FirstName")}
            id="FirstName"
            type="text"
            name="FirstName"
            placeholder="First Name"
            minLength={2}
            onChange={(e) =>
              setAddress({ ...address, FirstName: e.target.value })
            }
            value={address.FirstName}
            
          />
          
          {errors.FirstName && (
            <p className="text-red-700 text-xs mt-1">{errors.FirstName}</p>
          )}
        </div>

        <div className="w-[48%]">
          <label htmlFor="LastName" className="block mb-1.5">LastName</label>
          <input
            className={getInputClass("LastName")}
            id="LastName"
            type="text"
            name="LastName"
            placeholder="Last Name"
            onChange={(e) =>
              setAddress({ ...address, LastName: e.target.value })
            }
            value={address.LastName}
          />
          {errors.LastName && (
            <p className="text-red-700 text-xs mt-1">{errors.LastName}</p>
          )}
        </div>
      </div>

      <div>
        
      <label htmlFor="PhoneNumber" className="block mb-1.5">PhoneNumber</label>
        <input
          className={getInputClass("PhoneNumber")}
          type="tel"
          id="PhoneNumber"
          name="PhoneNumber"
          placeholder="Phone Number"
          onChange={(e) =>
            setAddress({ ...address, PhoneNumber: e.target.value })
          }
          value={address.PhoneNumber}
        />
        {errors.PhoneNumber && (
          <p className="text-red-700 text-xs mt-1">{errors.PhoneNumber}</p>
        )}
      </div>


      <div className="flex gap-4">
        <div className="flex-1 w-[50%]">
        <label htmlFor="Province" className="block mb-1.5">Province</label>
          <select
            className={getInputClass("Provience")}
            name="Provience"
            id="Province"
            onChange={handleBillingProvinceChange}
            value={address.Provience}
          >
            <option value="" disabled hidden>
              Select Province
            </option>
            <option value="Central">Central</option>
            <option value="Eastern">Eastern</option>
            <option value="Northern">Northern</option>
            <option value="Southern">Southern</option>
            <option value="Western">Western</option>
          </select>
          {errors.Provience && (
            <p className="text-red-700 text-xs mt-1">{errors.Provience}</p>
          )}
        </div>

        <div className="w-[50%]">
        <label htmlFor="Districts" className="block mb-1.5">District</label>
          <select
            className={getInputClass("District")}
            name="District"
            id="Districts"
            onChange={handleBillingDistrictChange}
            value={address.District}
            disabled={!address.Provience}
          >
            <option value="" disabled hidden >
              Select District
            </option>
            {billingDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.District && (
            <p className="text-red-700 text-xs mt-1">{errors.District}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <div className="w-[50%] flex-1 ">
        <label htmlFor="cities" className="block mb-1.5">City</label>
          <select
            className={getInputClass("City")}
            id="cities"
            name="City"
            onChange={(e) => setAddress({ ...address, City: e.target.value })}
            value={address.City}
            disabled={!address.District}
          >
            <option value="" disabled hidden >
              Select City
            </option>
            {billingCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.City && (
            <p className="text-red-700 text-xs mt-1">{errors.City}</p>
          )}
        </div>
        <div className="w-[50%]">
        <label htmlFor="HouseNo" className="block mb-1.5">HouseNumber / Street</label>
          <input
            className={getInputClass("HouseNo")}
            id="HouseNo"
            type="text"
            name="HouseNo"
            placeholder="Building / House No / Street No"
            onChange={(e) =>
              setAddress({ ...address, HouseNo: e.target.value })
            }
            value={address.HouseNo}
          />
          {errors.HouseNo && (
            <p className="text-red-700 text-xs mt-1">{errors.HouseNo}</p>
          )}
        </div>
      </div>

      <div>
      <label htmlFor="Address" className="block mb-1.5">Address</label>
        <input
          type="text"
          className={getInputClass("Area")}
          id="Address"
          name="Area"
          placeholder="Start typing your address..."
          value={value}
          onChange={handleAreaChange}
          disabled={!ready}
        />
        {status === "OK" && (
          <ul className="bg-white border border-gray-300 rounded shadow mt-1 max-h-36 overflow-y-auto">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleAreaSelect(description)}
                className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer text-sm"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
        {errors.Area && (
          <p className="text-red-700 text-xs mt-1">{errors.Area}</p>
        )}
      </div>
      <label htmlFor="AnyInformation" className="block mb-1.5">AnyInformation</label>
      <input
      type="text"
      name="AnyInformation"
      id="AnyInformation"
      placeholder="AnyInformation...(Optional)"
      value={address.AnyInformation}
      onChange={(e)=>{
        setAddress({...address,AnyInformation:e.target.value})
      }}
      className="w-full px-3 py-2.5 focus:border-[#cb1a2e] outline-none rounded text-gray-500 border border-gray-300 "
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="text-black cursor-pointer flex items-center gap-1"
          onClick={() => setActive("Shipping Address")}
        >
          ← Return To Shop
        </button>
        <button
          type="submit"
          className="bg-[#cb1a2e] text-white px-6 py-2 rounded-full font-medium flex items-center gap-1   hover:bg-red-800 cursor-pointer"
        >
          Continue To Shipping
        </button>
      </div>
    </form>
  );
};

export default BillingForm;