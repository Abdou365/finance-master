import React, { InputHTMLAttributes, useState } from "react";

interface ItemInput extends InputHTMLAttributes<HTMLInputElement> {}

const ItemInput: React.FC<ItemInput> = (props) => {
  const [active, SetActive] = useState(false);

  return <input {...props} />;
};

export default ItemInput;
