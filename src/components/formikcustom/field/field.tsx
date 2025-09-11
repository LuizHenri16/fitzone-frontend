'use client'

import { Field } from "formik";


// Text Field Component
interface TextFieldProps {
    name: string;
    label?: string;
    type: string;
    htmlFor?: string,
    placeholder: string
    theme?: "lined" | "filled";
}

// Custom themes for textfield and selectfield
const themes = {
    lined: "rounded-2xl border-2 border-[#C1C1C1]",
    filled: "rounded-2xl",
}

export const TextField: React.FC<TextFieldProps> = ({ name, htmlFor, label, type, placeholder, theme = "filled" }) => {
    const baseTheme = "w-full shadow-md bg-white px-5 py-3 text-[#6B3E23] font-medium outline-none text-center";
    const selectedTheme = themes[theme] || themes.lined
    const labelColor = theme === "filled" ? "text-[#FFF9ED]" : "text-[#6B3E23]"

    return (
        <div>
            <label htmlFor={htmlFor} className={`${labelColor} ${"font-bold"}`}> {label} </label>
            <Field
                className={`${baseTheme} ${selectedTheme}`}
                name={name} type={type} placeholder={placeholder}>
            </Field>
        </div>
    )
}

// Selelect Field Component
interface SelectFieldProps {
    name: string;
    theme?: "lined" | "filled";
    options?: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, options, theme = "filled" }) => {
    const baseTheme = "cursor-pointer shadow-md bg-white px-5 py-3 text-[#6B3E23] font-medium outline-none text-center";
    const selectedTheme = themes[theme] || themes.lined

    return (
        <div>
            <label htmlFor=""></label>
            <Field
                as="select"
                className={`${baseTheme} ${selectedTheme}`}
                name={name}>
                {options && options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </Field>
        </div>
    )
}   