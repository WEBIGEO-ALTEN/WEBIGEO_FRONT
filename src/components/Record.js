function Record({ records, currRecord }) {
    records.sort((a, b) => {
        return a.points === b.points ? Number(a.time) - Number(b.time) : b.points - a.points;
    })

    const convertTime = (time) => {

        var mili = time % 100;
        var nbrSeconds = Math.floor(time / 100);


        var minutes = Math.floor(nbrSeconds / 60);
        var seconds = nbrSeconds % 60;
        if (String(minutes).length === 1) {
            if (String(seconds).length === 1) {
                return <>{String(mili).length === 1 ? `0${minutes}:0${seconds}:0${mili}` : `0${minutes}:0${seconds}:${mili}`}</>
            }
            return <>{String(mili).length === 1 ? `0${minutes}:${seconds}:0${mili}` : `0${minutes}:${seconds}:${mili}`}</>
        }
        if (String(seconds).length === 1) {
            return <>{String(mili).length === 1 ? `${minutes}:0${seconds}:0${mili}` : `${minutes}:0${seconds}:${mili}`}</>
        }
        return <>{String(mili).length === 1 ? `${minutes}:${seconds}:0${mili}` : `${minutes}:${seconds}:${mili}`}</>
    }

    let recordTable = <table className="table text-light">
        <tbody>
            <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Points</th>
                <th scope="col">Temps</th>
            </tr>
            {records.map((record, i) => {
                if (record === currRecord || i <= 2) {
                    return (
                        <tr key={`record-${i}`} className={record === currRecord ? `text-warning` : ""}>
                            <th scope="row">{i + 1}</th>
                            <td>{record.user}</td>
                            <td>{record.points}</td>
                            <td>{convertTime(Number(record.time))}</td>
                        </tr>
                    )
                }
                return ""
            })}
        </tbody>
    </table>



    return (<div className="mt-2">{recordTable}</div>)
}

export default Record