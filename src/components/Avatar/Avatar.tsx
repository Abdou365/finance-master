import React from "react";

type Props = {};

const Avatar = (props: Props) => {
  return (
    <div className="flex align-middle gap-2">
      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
      <p>contact.grenadelle@gmail.com</p>
    </div>
  );
};

export default Avatar;
