import { useState, useEffect, useRef } from "react";

interface DropdownProps {
    isOpen: boolean;
    toggleDropdown: () => void;
}

const Dropdown = ({ isOpen, toggleDropdown }: DropdownProps) => {
    const [selected, setSelected] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleOptionClick = (option: string) => {
        setSelected(option);
        toggleDropdown();
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current.contains(event.target as Node)) &&
                buttonRef.current !== event.target
            ) {
                toggleDropdown();
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, toggleDropdown]);

    return (
        <div className="relative inline-block text-left w-full">
            <button
                onClick={toggleDropdown}
                type="button"
                className="w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                ref={buttonRef}
            >
                {selected ? selected : "Mode"}
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg"
                    ref={dropdownRef}
                >
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                                handleOptionClick("Email");
                            }}
                        >
                            Email
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
