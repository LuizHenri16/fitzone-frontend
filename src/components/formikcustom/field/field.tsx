'use client'

import { Field } from "formik";

interface TextFieldProps {
    name: string;
    type: string;
    placeholder: string
    theme?: "lined" | "filled";
}

const themes = {
    lined: "rounded-2xl border-2 border-[#C1C1C1]",
    filled: "rounded-2xl",
}

export const TextField: React.FC<TextFieldProps> = ({ name, type, placeholder, theme = "filled" }) => {
    const baseTheme = "shadow-md bg-white px-5 py-3 text-[#6B3E23] font-medium outline-none";
    const selectedTheme = themes[theme] || themes.lined

    return (
        <div>
            <Field
                className={`${baseTheme} ${selectedTheme}`}
                name={name} type={type} placeholder={placeholder}>
            </Field>
        </div>
    )
}