import { useState } from "react";
import { changeQuantity } from "../utils/wallet";
import { changeQuantity2 } from "../utils/wallet";

export function ChangeQuantity(props) {
  const [quantity, setQuantity] = useState("");

  return (
    <div>
    <div>
    <center>
    <font 
      color="white"
      size="6"
    >
    Jackpot Tokens
    </font>
    <font 
      color="white"
    >
    <br />
   0.77 xtz each
    <br />
    <img
      src="https://s3.us-west-2.amazonaws.com/henftz.xyz/nftb/jackpot.png"
      width="300"
    />
    </font>
    </center>
    </div>
    <div>  
    <center>
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
        className="bg-red-500 px-6 py-3 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Batch Buy
      </button>
    </center>
    </div>
    </div>
  );
}

export function ChangeQuantity2(props) {
  const [quantity2, setQuantity2] = useState("");

  return (
    <div>
    <div>
    <center>
    <font 
      color="white"
      size="6"
    >
    Founders Edition Tokens
    </font>
    <font 
      color="white"
    >
    <br />
    10 xtz each
    <br />
    <img
      src="https://s3.us-west-2.amazonaws.com/henftz.xyz/nftb/founders.png"
      width="300"
    />
    </font>
    </center>
    </div>
    <div>  
    <center>
    <input
        type="text"
        name="name"
        placeholder="Number of Tokens"
        onChange={(e) => {
          setQuantity2(e.target.value);
        }}
        value={quantity2}
      />
      <button
        onClick={() => {
          changeQuantity2(quantity2);
        }}
        className="bg-red-500 px-6 py-3 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Batch Buy
      </button>
    </center>
    </div>
    </div>
  );
}
