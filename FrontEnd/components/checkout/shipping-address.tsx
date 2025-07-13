"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";
import usePlacesAutocomplete from 'use-places-autocomplete';
import { BiSolidHandRight } from "react-icons/bi";
import { FaHandPointDown } from "react-icons/fa";

interface FormErrors {
  FirstName?: string;
  LastName?: string;
  Provience?: string;
  District?: string;
  City?: string;
  Area?: string;
  HouseNo?:string;
}

const Shipping_AddressSection = () => {
  const {
    address,
    setActive,
    setIsAddressComplete,
    shippingSame,
    setShippingSame,
    shiftAddress,
    setShiftAddress,
    shippingCities,
    shippingDistricts,
    setShippingCities,
    setShippingDistricts,
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
      
      componentRestrictions: { country: 'lk' },
    },
    debounce: 300,
  });

  useEffect(() => {
    if (shiftAddress.Area) {
      setValue(shiftAddress.Area, false); 
    }
  }, [shiftAddress.Area,setValue]);

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShiftAddress({ ...shiftAddress, Area: e.target.value });
  };
  const handleAreaSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();
    setShiftAddress({ ...shiftAddress, Area: description });
  };

  const [errors, setErrors] = useState<FormErrors>({});
  

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!shiftAddress.FirstName) errors.FirstName = "First name is required";
    if (!shiftAddress.LastName) errors.LastName = "Last name is required";
    if (!shiftAddress.Provience) errors.Provience = "Province is required";
    if (!shiftAddress.District) errors.District = "District is required";
    if (!shiftAddress.City) errors.City = "City is required";
    if (!shiftAddress.Area) errors.Area = "Address is required";
    if (!shiftAddress.HouseNo) errors.HouseNo = "House No / Street No is required";
    else if(!/^(?=.*\d).{3,}$/.test(shiftAddress.HouseNo)){
      errors.Area="This field  must be house or Street Number and should contain atleast 2 or more Characters ";
}

    return errors;
  };

  const handleProvinceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const selectedProvince = e.target.value;

      setShiftAddress({
        ...shiftAddress,
        Provience: selectedProvince,
        District: "",
        City: "",
      });

      const response = await axiosInstance.get("/api/getDistricts", {
        params: { province: selectedProvince },
      });
      if (response.data.success) {
        setShippingDistricts([...response.data.districts]);
      } else {
        setShippingDistricts([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setShippingDistricts([]);
    }
  };

  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedDistrict = e.target.value;

      setShiftAddress({
        ...shiftAddress,
        District: selectedDistrict,
        City: "",
      });

      const response = await axiosInstance.get("/api/getCities", {
        params: { district: selectedDistrict },
      });
      if (response.data.success) {
        setShippingCities([...response.data.cities]);
      } else {
        setShippingCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setShippingCities([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (shippingSame) {
      if (address) {
        setIsAddressComplete(true);
        setActive("Payment");
      }
      return;
    }

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsAddressComplete(true);
      setActive("Payment");
     
    } else {
      setIsAddressComplete(false);
    }
  };

  const getInputClass = (field: keyof FormErrors) =>
    `w-full px-3 py-2.5 focus:border-red-500 border ${
      errors[field] ? "border-red-700" : "border-gray-300"
    } outline-none rounded text-gray-500`;

  useEffect(() => {
    if (!shippingSame) {
     
      if (shiftAddress.FirstName) {
        setErrors((prev) => ({ ...prev, FirstName: "" }));
      }
      if (shiftAddress.LastName) {
        setErrors((prev) => ({ ...prev, LastName: "" }));
      }
      if (shiftAddress.Provience) {
        setErrors((prev) => ({ ...prev, Provience: "" }));
      }
      if (shiftAddress.District) {
        setErrors((prev) => ({ ...prev, District: "" }));
      }
      if(shiftAddress.City){
        setErrors((prev) => ({ ...prev, City: "" }));
      }
  
      if (shiftAddress.Area) {
        setErrors((prev) => ({ ...prev, Area: "" }));
      }
      if (shiftAddress.HouseNo) {
        setErrors((prev) => ({ ...prev, HouseNo: "" }));
      }
  
      const AreatPattern=/^(?=.*\d).{10,}$/;
      const isAreaValid=AreatPattern.test(shiftAddress.HouseNo);




      const isComplete =
        shiftAddress.FirstName !== "" &&
        shiftAddress.LastName !== "" &&
        shiftAddress.Provience !== "" &&
        shiftAddress.District !== "" &&
        shiftAddress.City !== "" &&
        shiftAddress.HouseNo!== ""&&
        isAreaValid;
      setIsAddressComplete(isComplete);
    } else {
      setIsAddressComplete(true);
    }
  }, [shiftAddress, shippingSame]);

  

  return (
    <div className="mt-4 space-y-4">
      <label className="flex items-center space-x-2 text-gray-700 mt-2">
        <input
          type="checkbox"
          checked={!shippingSame}
          onChange={() => setShippingSame(!shippingSame)}
          className="accent-black"
        />
        <span>Ship to a different address?</span>
      </label>

      {shippingSame ? (
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="text-black cursor-pointer flex items-center gap-1"
            onClick={() => setActive("Billing_Details")}
          >
            ← Return To Billing
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#cb1a2e] text-white px-6 py-2 rounded-full font-medium flex items-center gap-1 hover:bg-red-800 cursor-pointer"
          >
            Continue To Shipping Methods →
          </button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-3 w-full">
            <div className="w-1/2">
            <label htmlFor="FirstName" className="block mb-1.5">FirstName</label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder="First Name"
                value={shiftAddress.FirstName}
                onChange={(e) =>
                  setShiftAddress({
                    ...shiftAddress,
                    FirstName: e.target.value,
                  })
                }
                className={getInputClass("FirstName")}
              />
              {errors.FirstName && (
                <p className="text-red-700 text-xs mt-1">{errors.FirstName}</p>
              )}
            </div>
            <div className="w-1/2">
            <label htmlFor="LastName" className="block mb-1.5">LastName</label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                placeholder="Last Name"
                value={shiftAddress.LastName}
                onChange={(e) =>
                  setShiftAddress({ ...shiftAddress, LastName: e.target.value })
                }
                className={getInputClass("LastName")}
              />
              {errors.LastName && (
                <p className="text-red-700 text-xs mt-1">{errors.LastName}</p>
              )}
            </div>
          </div>

          <div>
          <label htmlFor="Province" className="block mb-1.5">Province</label>
            <select
              id="Province"
              name="Provience"
              value={shiftAddress.Provience}
              onChange={(e) => {
                handleProvinceChange(e);
              }}
              className={getInputClass("Provience")}
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

          <div className="flex gap-3">
            <div className="w-1/2">
            <label htmlFor="District" className="block mb-1.5">District</label>
              <select
                id="District"
                className={getInputClass("District")}
                name="District"
                onChange={handleDistrict}
                value={shiftAddress.District}
                disabled={!shiftAddress.Provience}
              >
                <option value="" disabled hidden>
                  Select District
                </option>
                {shippingDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.District && (
                <p className="text-red-700 text-xs mt-1">{errors.District}</p>
              )}
            </div>
            <div className="w-1/2">
            <label htmlFor="City" className="block mb-1.5">City</label>
              <select
                id="City"
                className={getInputClass("City")}
                name="City"
                onChange={(e) =>
                  setShiftAddress({ ...shiftAddress, City: e.target.value })
                }
                value={shiftAddress.City}
                disabled={!shiftAddress.District}
              >
                <option value="" disabled hidden>
                  Select City
                </option>
                {shippingCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.City && (
                <p className="text-red-700 text-xs mt-1">{errors.City}</p>
              )}
            </div>
          </div>
      
          <div>
          <label htmlFor="Address" className="block mb-1.5">Address</label>
          <input
          type="text"
          className={getInputClass('Area')}
          id="Address"
          name="Area"
          placeholder="Start typing your address..."
          value={value}
          onChange={handleAreaChange}
          disabled={!ready}
      />
          {status === 'OK' && (
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
          <div>
          <label htmlFor="HouseNo" className="block mb-1.5">HouseNo / Street </label>
          <input
                type="text"
                id="HouseNo"
                name="HouseNo"
                placeholder="Building / House No / Street"
                value={shiftAddress.HouseNo}
                onChange={(e) =>
                  setShiftAddress({ ...shiftAddress, HouseNo: e.target.value })
                }
                className={getInputClass("LastName")}
              />
              {errors.HouseNo && (
                <p className="text-red-700 text-xs mt-1">{errors.HouseNo}</p>
              )}

          </div>
          <label htmlFor="AnyInformation" className="block mb-1.5">AnyInformation</label>
          <input
          type="text"
          id="AnyInformation"
          name="AnyInformation"
          placeholder="AnyInformation..."
          value={shiftAddress.AnyInformation}
          onChange={(e)=>setShiftAddress({...shiftAddress,AnyInformation:""})}
          className="w-full px-3 py-2.5 focus:border-[#cb1a2e] outline-none rounded text-gray-500 border border-gray-300"
          />
          <div className="text-justify text-[13px] text-gray-400 flex items-start gap-2">
            <span className="text-amber-300"><BiSolidHandRight /></span>
          <div className="flex items-end  "><p>"If you click 'Shipping to a different address' and provide a new address, your order will be shipped to that new address. Otherwise, the billing address will be used as the shipping address by default.
          Want to continue with this address? then <span className="text-red-600 font-medium">Click below here</span>"</p><div> <FaHandPointDown className="fill-amber-400"/></div></div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="text-black cursor-pointer flex items-center gap-1"
              onClick={() => setActive("Billing_Details")}
            >
              ← Return To Billing
            </button>
            <button
              type="submit"
              className="bg-[#cb1a2e] text-white px-6 py-2 rounded-full font-medium flex items-center gap-1 hover:bg-red-800 cursor-pointer"
            >
              Continue To Shipping Methods →
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Shipping_AddressSection;