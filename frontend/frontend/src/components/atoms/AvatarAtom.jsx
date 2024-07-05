import React from "react";


const AvatarAtom = ({ img, className }) => {
  return (
    <div>
      <img
        src={`./src/assets/${img}`}
        alt="Logo Subcoffee"
        className={`h-8 w-auto mr-2 rounded-full ${className} cursor-pointer duration-500`}
      />
    </div>
  );
};

export default AvatarAtom;