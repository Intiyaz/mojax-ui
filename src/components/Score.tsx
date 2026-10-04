export default function Score({
    title,
    score,
}: {
    title: string;
    score: number;
}) {
    const n = Math.max(0, Math.min(100, score || 0));
    return (
        <div className="score">
            <div className="score-header">
                <span>{title}</span>
                <div className="score-value">
                    {n}
                    <small>/100</small>
                </div>
            </div>
            <div className="progress">
                <div style={{ width: `${n}%` }} />
            </div>
        </div>
    );
}
