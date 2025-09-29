
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
    const baseTheme = 'w-full shadow-md px-5 py-3 rounded-2xl transition-colors duration-300 font-semibold cursor-pointer hover:opacity-90';
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

interface ShortcutButtonProps {
    urlIcon: string,
    altIcon: string,
    color?: "blue" | "cyan" | "green" | "orange",
    name: string,
    onClick?: () => void;
}

const colors = {
    blue: "text-[#538FC0]",
    cyan: "text-[#61C3B6]",
    green: "text-[#018A5E]",
    orange: "text-[#FD9467]",
}

export const ShortcutButton: React.FC<ShortcutButtonProps> = ({ urlIcon, color = "blue", altIcon, name, onClick }) => {
    const selectedColor = colors[color] || colors.blue;

    return (
        <button onClick={onClick} className="cursor-pointer p-2 w-34 py-5 flex flex-col justify-center items-center gap-2 border-3 border-[#C1C1C1] rounded-2xl shadow-md transition-colors duration-300 hover:opacity-80
                                             min-[1280px]:w-[12rem] min-[1280px]:h-[8rem]">
            <img src={urlIcon} alt={altIcon} className="w-8" />
            <p className={`${selectedColor} ${"text-shadow-md font-bold text-sm lg:text-base"}`}>{name}</p>
        </button>
    )
}

interface SidebarButtonProps {
    urlIcon: string,
    altIcon: string,
    name: string,
    onClick?: () => void;

}

export const SidebarButton: React.FC<SidebarButtonProps> = ({ urlIcon, altIcon, name, onClick }) => {
    return <button onClick={onClick} className=" w-full mx-auto cursor-pointer px-4 py-3 flex items-center gap-2 rounded-2xl hover:shadow-md hover:bg-[#e4e4e4] transition-colors duration-200">
        <img src={urlIcon} alt={altIcon} className="w-8" />
        <p className={"text-[#7E7E7E] font-normal text-lg"}>{name}</p>
    </button>
}