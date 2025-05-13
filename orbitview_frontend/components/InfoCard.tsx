import React from "react";
import { Info } from "lucide-react"; // make sure to install lucide-react

interface InfoCardProps {
    message: string;
}

const InfoCard = ({ message }: InfoCardProps) => {
  return (
    <div className="flex items-stretch rounded-xl overflow-hidden shadow-md w-full max-w-md">
      {/* Icon section - darker gold */}
      <div className="bg-yellow-700 p-3 flex justify-center items-center">
        <Info className="text-white w-5 h-5" />
      </div>

      {/* Message section - lighter gold */}
      <div className="bg-yellow-300 px-4 py-3 text-sm text-yellow-900 flex items-center">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default InfoCard;
