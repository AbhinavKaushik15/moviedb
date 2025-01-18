import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select top-2 inline-block">
      <select defaultValue="0" className="inline-block" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => {
          return (
            <option key={i} value={o}>
              {o.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
