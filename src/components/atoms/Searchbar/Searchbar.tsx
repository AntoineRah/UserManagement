import React from "react";

const Searchbar: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ onChange }) => {
    return (
        <div className="p-4">
            <input type="search" name="Search users..." placeholder="Search users..." className="border border-gray-400 text-black px-2 py-1 rounded " onChange={onChange} />
        </div>

    )
}
export { Searchbar };