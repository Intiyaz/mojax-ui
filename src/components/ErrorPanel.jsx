export default function ErrorPanel({ message, onClose, }) {
    return (<div className="error-panel">
            <div>
                <strong>Something went wrong</strong>
                <p>{message}</p>
            </div>
            <button onClick={onClose}>×</button>
        </div>);
}
