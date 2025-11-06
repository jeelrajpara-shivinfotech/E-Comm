function BaseButton({ children, ...props }) {
    return (
        <button
            type="submit"
            {...props}
            className="w-full bg-black text-white py-3 cursor-pointer rounded-md flex items-center justify-center
                "
        >
            {children}
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                className="ms-2 mt-0.5 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
            </svg>
        </button>
    );
}

export default BaseButton;
