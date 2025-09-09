// Custom theme for buttons
const themes = {
    beige: "bg-[#F1DDB7] text-[#6B3E23]",
    green: "bg-[#116343] text-[#FFF9ED]",
    red: "bg-[#C4505C] text-[#FFF9ED]",
    brown: "bg-[#BC8C4A] text-[#FFF9ED]",
}

// Button Coponent
interface ButtonProps {
    name: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    theme?: "beige" | "green" | "red" | "brown";
}

export const Button: React.FC<ButtonProps> = ({ name, type = "button", disabled = false, onClick, theme = "beige" }) => {
    const baseTheme = 'shadow-md px-5 py-3 rounded-2xl transition-colors duration-300 font-semibold cursor-pointer hover:opacity-90';
    const selectedTheme = themes[theme] || themes.beige;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseTheme} ${selectedTheme}`}
        > {name}
        </button>
    );
}