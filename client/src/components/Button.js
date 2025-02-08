import "../styles/button.css";
export function Button({ type,onClick,children }) {
    return <button type={type} onClick={onClick} className="button">{ children}</button>
}