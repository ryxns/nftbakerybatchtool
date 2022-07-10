import { useState } from "react";
import { changeQuantity } from "../utils/wallet";

export default function ChangeQuantity(props) {
  const [quantity, setQuantity] = useState("");

  return (
    <div>
    <div>
    <center>
    <font 
      color="white"
    >
    Sneak Peek Raffle Tickets
    <br />
    <img
      src="https://assets.objkt.media/file/assets-003/KT1Su8d1iujzDutdQhm1JBnKNkbkxLkMeTxV/0/thumb288"
    />
    </font>
    </center>
    </div>
    <div className="flex">  
    <input
        type="text"
        name="name"
        placeholder="Number of Tickets"
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
    </div>
  );
}
