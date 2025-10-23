import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";

const Setting = () => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.name == "" || formData.email == "") {
      alert("fill all the feilds");
    } else {
      console.log(formData);
      alert("Profile has been change");
      setFormdata({
        name: "",
        email: "",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 ">
      {/* heading */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 font-medium text-2xl mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        {/* profile and others */}
        <div>
          {/* profile form */}
          <div className="border border-gray-200 rounded-lg px-8 py-5 bg-white">
            <form onSubmit={handleOnSubmit}>
              <p className="flex items-center gap-2 mb-4">
                <FiUser size={18} className="text-blue-600" />
                <span className="text-lg text-gray-900">User Profile</span>
              </p>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-gray-900 ">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    type="text"
                    className="bg-gray-100 w-full rounded-lg py-2 px-3 focus:outline-0  focus:ring-gray-300 focus-visible:ring-ring/50 focus-visible:ring-[3px]
"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-gray-900 ">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    type="email"
                    className="bg-gray-100 w-full rounded-lg py-2 px-3 focus:outline-0  focus:ring-gray-300 focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    placeholder="Enter your email"
                  />
                </div>
                {/* button */}
              </div>
              <button className="flex items-center gap-4 justify-between bg-blue-600  text-white font-medium hover:bg-blue-700 px-3 py-2 rounded-lg mt-3 cursor-pointer">
                <RiSave3Line fontSize={18} /> Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
