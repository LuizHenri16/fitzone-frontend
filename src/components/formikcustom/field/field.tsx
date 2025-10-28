'use client'

import { InputMask } from "@react-input/mask";
import { Field, FieldInputProps, FieldProps, useField } from "formik";


// Text Field Component
interface CustomFieldProps {
    name: string;
    label?: string;
    mask?: string;
    type: string;
    htmlFor?: string,
    placeholder?: string
    theme?: "lined" | "filled";
}

// Custom themes for textfield and selectfield
const themes = {
    lined: "rounded-2xl border-2 border-[#C1C1C1]",
    filled: "rounded-2xl",
}

export const TextField: React.FC<CustomFieldProps> = ({ name, htmlFor, label, type, placeholder, theme = "filled", mask}) => {
    const [field, meta, helpers] = useField(name);
    const baseTheme = "w-full shadow-md bg-white px-5 py-3 text-[#6B3E23] font-medium outline-none text-center";
    const selectedTheme = themes[theme] || themes.lined
    const labelColor = theme === "filled" ? "text-[#FFF9ED]" : "text-[#6B3E23]"

    return (
        <div className="flex flex-col items-start gap-1">
            <label htmlFor={htmlFor} className={`${labelColor} ${"font-bold text-lg"}` }> {label} </label>
            {mask ? (
                <InputMask
                    mask={mask}
                    replacement={{ X: /\d/ }}
                    value={field.value || ''}
                    onChange={(e) => helpers.setValue(e.target.value)}
                    onBlur={() => helpers.setTouched(true)}
                    placeholder={placeholder}
                    className={`${baseTheme} ${selectedTheme}`}
                />
            ) : (
                <Field
                    id={htmlFor}
                    className={`${baseTheme} ${selectedTheme}`}
                    name={name} type={type} placeholder={placeholder}>
                </Field>
            )
            }
        </div >
    )
}

// Selelect Field Component
interface SelectFieldProps {
    name: string,
    label?: string,
    htmlFor?: string,
    theme?: "lined" | "filled",
    options?: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, htmlFor, options, theme = "filled" }) => {
    const baseTheme = "w-full cursor-pointer shadow-md bg-white px-5 py-3 text-[#6B3E23] font-medium outline-none text-center";
    const selectedTheme = themes[theme] || themes.lined
    const labelColor = theme === "filled" ? "text-[#FFF9ED]" : "text-[#6B3E23]"

    return (
        <div className="flex flex-col items-start gap-1">
             <label htmlFor={htmlFor} className={`${labelColor} ${"font-bold text-lg"}` }> {label} </label>
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
