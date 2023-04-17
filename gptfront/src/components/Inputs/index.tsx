import React, { FC } from "react";
import "./index.css";

type inputElements = {
  name: string;
  placeHolder: string;
  value: string | number | undefined;
  type: string;
};

interface IProps {
  inputInfo: inputElements[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputComponent: FC<IProps> = ({ inputInfo, handleChange }) => {
  const choseFunction = (type: string, placeholder: string, name: string, value: string | number | undefined) => {
    switch (type) {
      case "input":
        return (
          <>
            <input
              value={value}
              type="number"
              name={name}
              placeholder={placeholder}
              onChange={(e) => handleChange(e)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </>
        );
      case "textarea":
        return (
          <>
            <textarea name={name} placeholder={placeholder} onChange={(e) => handleChange(e)} defaultValue={value} />
          </>
        );
    }
  };
  return (
    <>
      {inputInfo.map((e) => {
        return (
          <div className="input_element_container" key={e.name}>
            <label>{e.placeHolder} :</label>
            <h2></h2>
            {choseFunction(e.type, e.placeHolder, e.name, e.value)}
          </div>
        );
      })}
    </>
  );
};

export default InputComponent;
