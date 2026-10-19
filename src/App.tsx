import { useState, useEffect } from 'react';

const sheetId = '1YUgFc_TNMsN__ZV6rqFOeCnTyF8jGW0oBeKBqFjWXPM';
// const sheetName = 'Copy of Sheet1';

const baseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
// const baseQuery = `?sheet=${encodeURIComponent(sheetName)}`;

const useGetData = () => {
    const [data, setData] = useState<any>({});

    useEffect(() => {
        async function triggerFetch() {
            const response = await fetch(baseUrl);
            // console.log('fetch response: ', response);

            const text = await response.text();
            // console.log('text: ', text);

            const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)![1]);

            // console.log('json', json);
            setData(json.table);
        }

        triggerFetch();
    }, []);

    return data;
};

const url =
    'https://script.google.com/macros/s/AKfycbww15KiRCg1rka57IR1JX6GzG8UhYqAgPPvaqXJjZVvygsraBv1FXB-cKG6DeOgEuG-/exec';

function App() {
    const tableData = useGetData();
    // console.log('tableData: ', tableData);

    async function handlePost() {
        console.log('button clicked');

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ foo: 'foo str' })
        })
            .then((r) => r.text())
            .then((d) => console.log(JSON.parse(d)));
    }

    async function handleHelloWorld() {
        console.log('handleHelloWorld clicked');
        fetch(url, {
            method: 'POST',
            body: 'hello world from frontend'
        })
            .then((r) => r.text())
            .then((d) => console.log(JSON.parse(d)));
    }

    return (
        <>
            <button onClick={handleHelloWorld}>hello world turn around</button>
            <hr />
            <button onClick={handlePost}>POST</button>
            <hr />
            <table>
                <thead>
                    <tr>
                        {tableData?.cols?.map((col: any) => {
                            return <th key={Math.random()}>{col?.label}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.rows?.map((row: any, i: number) => {
                        return (
                            <tr key={Math.random() + 'b'}>
                                {row?.c?.map((cell: any) => {
                                    return <td key={Math.random() + 'a'}>{cell?.f ?? cell?.v}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default App;
