import { useState } from "react";
import { changeQuantity } from "../utils/wallet";

export default function ChangeQuantity(props) {
  const [name, setQuantity] = useState("");

  return (
    <div className="flex">
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        value={quantity}
      />
      <button
        onClick={() => {
          changeQuantity(quantity);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Batch Buy
      </button>
    </div>
  );
}
