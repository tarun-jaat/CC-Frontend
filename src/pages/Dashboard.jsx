import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiShare2, FiUserPlus, FiAward, FiStar } from "react-icons/fi";
import { LogOut } from "lucide-react";
import { logout } from "../store/userSlice";
import animation from "../assets/referalAnimation.mp4";
import toast from "react-hot-toast";
import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log(JSON.stringify(user)+"hygyu");
  const referralId = user.referralId;
  const userName = user.name;
  const referralCount = user.referralCount;
  const referralBenefits = [
    {
      tier: 1,
      required: 1,
      reward: "75 KM Free Ride",
      progress: Math.min(referralCount, 1),
      earned: Math.min(referralCount, 1) * 75,
    },
    {
      tier: 2,
      required: 1,
      reward: "Another 75 KM Free",
      progress: Math.max(0, Math.min(referralCount - 1, 1)),
      earned: Math.min(Math.max(referralCount - 1, 0), 1) * 75,
    },
    {
      tier: 3,
      required: 1,
      reward: "100 KM Free + Priority Support",
      progress: Math.max(0, referralCount - 2),
      earned: Math.max(referralCount - 2, 0) * 100,
    },
  ];

  const totalEarnedKM = referralBenefits.reduce((sum, b) => sum + b.earned, 0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      (error) => {
        toast("Failed to copy to clipboard.");
      }
    );
  };

  const shareUrl = `${window.location.origin}/signup?ref=${referralId}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6 sm:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="md:text-4xl text-xl font-bold text-gray-900 mb-4">
            Welcome Back,
            <span className="text-[#1791c8]">
              {userName || "Valued Passenger"}!
            </span>{" "}
            👋
          </h1>
          <p className="md:text-lg text-gray-600">
            Every referral brings you closer to amazing rewards 🚕💨
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {referralCount}
                </p>
                <p className="text-gray-600">Total Referrals</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl flex items-center justify-start shadow-sm border border-purple-100">
            <div className="flex items-start w-full justify-start gap-4">
              <div className="p-3 bg-purple-100  rounded-xl">
                <FiStar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="w-full">
                <p className="text-2xl font-bold text-gray-900">
                  {totalEarnedKM} KM
                </p>
                <p className="text-gray-600">Total Free Rides Earned</p>

                <div className="h-5 mt-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                    style={{
                      width: `${(totalEarnedKM / 250) * 100}%`,
                    }}
                  >
                    {" "}
                    <p className="text-center text-white">
                      {totalEarnedKM}/250
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-2xl shadow-sm border border-green-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiAward className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {referralBenefits.find((b) => b.progress > 0)?.tier || "0"}{" "}
                  Tier
                </p>
                <p className="text-gray-600">Current Reward Level</p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-green-100">
          <div className="flex items-center gap-4">
            {/* <div className="p-3 bg-green-100 rounded-xl">
                <FiAward className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {referralBenefits.find((b) => b.progress > 0)?.tier || "0"}{" "}
                  Tier
                </p>
                <p className="text-gray-600">Current Reward Level</p>
              </div> */}
            <video className="max-h-80 w-full" autoPlay loop muted>
              <source src={animation} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Referral Section */}
        {referralId && (
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6 mb-10 border border-orange-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FiShare2 className="text-orange-500" />
              Your Referral Link
            </h2>
            <div className="space-y-6">
              <div className="flex gap-3 items-center justify-center md:flex-row flex-col">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-50 font-mono"
                  onClick={() => copyToClipboard(shareUrl)}
                />
                <div className="flex gap-3 ">
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <InstapaperShareButton url={shareUrl}>
                  <InstapaperIcon size={32} round />
                </InstapaperShareButton>
              </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  🎉 Referral Rewards
                </h3>
                <ul className="space-y-3">
                  {referralBenefits.map((benefit) => (
                    <li
                      key={benefit.tier}
                      className="flex md:flex-row flex-col w-full items-start md:items-center gap-3"
                    >
                      <div className="flex-1 w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Tier {benefit.tier}</span>
                          <span className="text-sm text-gray-600">
                            {benefit.progress}/{benefit.required}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full w-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                            style={{
                              width: `${
                                (benefit.progress / benefit.required) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm md:mt-6 font-semibold text-blue-600 ml-3">
                        {benefit.reward}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Personalized Message */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8 rounded-2xl text-center">
          <h2 className="md:text-2xl text-lg font-bold mb-4">
            Your Next Reward Awaits! 🚀
          </h2>
          <p className="md:text-lg text-md mb-6">
            {referralCount < 3
              ? `Only ${3 - referralCount} more referrals to unlock Tier ${
                  referralCount < 1 ? 1 : referralCount < 2 ? 2 : 3
                } rewards!`
              : "Youve unlocked all rewards! Keep referring for special bonuses!"}
          </p>
        </div>
        <div className="fixed bottom-5 right-6">
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className="group  flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
          >
            <span className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start text-white group-hover:px-3">
              <LogOut />
            </span>
            <span className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Logout
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
