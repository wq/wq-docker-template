export default function LegendIcon({ name }) {
    const [shape, color] = name.split("-");
    if (shape === "circle") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle cx="10" cy="10" r="6" fill={color} />
                <circle cx="10" cy="10" r="3" fill="#ffffff" />
            </svg>
        );
    }
    return null;
}
