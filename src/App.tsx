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
            console.log('fetch response: ', response);

            const text = await response.text();
            console.log('text: ', text);

            const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)![1]);

            console.log('json', json);
            setData(json.table);
        }

        triggerFetch();
    }, []);

    return data;
};

const postScriptUrl = 'AKfycbxUjSDRAzihqi6iAOypSj0WtJ0kwmsGWgcUBEvVk5uTsMIdot8VLuK1snsv_lkNXeWf';

function App() {
    const tableData = useGetData();
    console.log('tableData: ', tableData);

    async function handlePost() {
        console.log('button clicked');
        const url =
            'https://script.google.com/macros/s/AKfycbykyjHKLbsiRXGr47V4ArKhQGvn1CJ66ayf9bg5HauoQam9hVO0PT5aQXMP0_-SVbWw/exec';

        fetch(url, {
            method: 'POST'
        });
    }

    return (
        <>
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
