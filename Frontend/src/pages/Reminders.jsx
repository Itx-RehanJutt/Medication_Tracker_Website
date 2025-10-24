import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { LuChrome } from "react-icons/lu";
import {
  IoIosNotificationsOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
// import { IoIosNotificationsOutline } from "react-icons/io";
const Reminders = () => {
  const [selected, setSelected] = useState("All");

  // ✅ Data items for filtering
  const items = [
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Atorvastatin",
      spantag: "12:00 PM • 20 mg",
    },
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Levothyroxine",
      spantag: "2:00 PM • 75 µg",
    },
    {
      icon: (
        <IoIosCheckmarkCircleOutline size={22} className="text-green-700" />
      ),
      category: "Done",
      heading: "Metformin",
      spantag: "9:00 AM • 500 mg",
    },
    {
      icon: <RxCrossCircled size={22} className="text-red-700" />,
      category: "Missed",
      heading: "Omeprazole",
      spantag: "7:00 AM • 20 mg",
    },
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Vitamin D3",
      spantag: "6:00 PM • 2000 IU",
    },
    {
      icon: (
        <IoIosCheckmarkCircleOutline size={22} className="text-green-700" />
      ),
      category: "Done",
      heading: "Lisinopril",
      spantag: "8:00 AM • 10 mg",
    },
    {
      icon: <RxCrossCircled size={22} className="text-red-700" />,
      category: "Missed",
      heading: "Warfarin",
      spantag: "7:30 AM • 2 mg",
    },
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Simvastatin",
      spantag: "11:00 AM • 40 mg",
    },
    {
      icon: (
        <IoIosCheckmarkCircleOutline size={22} className="text-green-700" />
      ),
      category: "Done",
      heading: "Amlodipine",
      spantag: "10:30 AM • 5 mg",
    },
    {
      icon: <RxCrossCircled size={22} className="text-red-700" />,
      category: "Missed",
      heading: "Clopidogrel",
      spantag: "8:15 AM • 75 mg",
    },
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Furosemide",
      spantag: "4:00 PM • 20 mg",
    },
    {
      icon: (
        <IoIosCheckmarkCircleOutline size={22} className="text-green-700" />
      ),
      category: "Done",
      heading: "Levocetirizine",
      spantag: "12:30 PM • 5 mg",
    },
    {
      icon: <IoIosNotificationsOutline size={25} className="text-blue-700" />,
      category: "Upcoming",
      heading: "Paracetamol",
      spantag: "3:00 PM • 500 mg",
    },
    {
      icon: <RxCrossCircled size={22} className="text-red-700" />,
      category: "Missed",
      heading: "Pantoprazole",
      spantag: "9:00 PM • 40 mg",
    },
  ];

  // ✅ Filter items by tab
  const filteredItems =
    selected === "All"
      ? items
      : items.filter((item) => item.category === selected);

  // ✅ Toast actions
  const markAsDone = () => {
    toast.success("Marked as taken!");
  };

  const delayTask = () => {
    toast.loading("Please wait some time...", { duration: 2000 });
  };

  const skipTask = () => {
    toast.error("Task skipped!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* ✅ Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Heading Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 font-semibold text-2xl mb-1">
            Reminders & Notifications
          </h1>
          <p className="text-gray-600">Manage your medication reminders</p>
        </div>

        {/* ✅ Notification Preferences */}
        <div className="border border-gray-200 rounded-lg px-8 py-6 bg-white shadow-sm">
          <div className="mb-5">
            <span className="text-gray-900 font-medium">
              Notification Preferences
            </span>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <div className="flex items-center gap-2 bg-blue-100/50 px-3 py-2 rounded-lg border border-blue-200">
              <LuChrome className="text-blue-600" size={18} />
              <span className="text-sm text-blue-900">
                Browser Notifications
              </span>
            </div>

            <div className="flex items-center gap-2 bg-green-100/50 px-3 py-2 rounded-lg border border-green-200">
              <MdOutlineEmail className="text-green-600" size={18} />
              <span className="text-sm text-green-900">Email Reminders</span>
            </div>
          </div>
        </div>

        {/* ✅ Tabs Section */}
        <div className="flex flex-col items-start justify-start py-10">
          <div className="flex justify-between w-full max-w-xl mb-6 bg-[#ececf0] py-1 px-1 border border-gray-300 rounded-xl shadow-sm text-sm">
            {["All", "Upcoming", "Done", "Missed"].map((option) => (
              <label
                key={option}
                className={`flex-1 text-center cursor-pointer font-semibold rounded-lg py-1 transition-all duration-200 ${
                  selected === option
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  className="hidden"
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                />
                {option}
              </label>
            ))}
          </div>

          {/* ✅ Filtered Items List */}
          <ul className="w-full space-y-3">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <div>{item.icon}</div>
                  <div>
                    <h3 className="text-gray-900 font-base text-[15px]">
                      {item.heading}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.spantag}</p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                  <span
                    className={`px-3 py-[3px] text-xs font-semibold rounded-lg ${
                      item.category === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : item.category === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.category}
                  </span>

                  {item.category === "Done" ? null : item.category ===
                    "Missed" ? (
                    <button
                      onClick={markAsDone}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
                    >
                      <IoIosCheckmarkCircleOutline /> Mark as Taken
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={markAsDone}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
                      >
                        <IoIosCheckmarkCircleOutline /> Mark as Taken
                      </button>
                      <button
                        onClick={delayTask}
                        className="flex items-center gap-1 border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-medium px-3 py-1.5 rounded-lg"
                      >
                        ⏰ Delay
                      </button>
                      <button
                        onClick={skipTask}
                        className="flex items-center gap-1 border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-medium px-3 py-1.5 rounded-lg"
                      >
                        🚫 Skip
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}

            {filteredItems.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-4">
                No items found.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
