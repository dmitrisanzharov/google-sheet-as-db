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

function App() {
    const tableData = useGetData();
    console.log('tableData: ', tableData);

    async function handlePost(){
        const postUrl = 'https://script.google.com/macros/s/AKfycbzOdsIDkyz4zQIqMGw0iDS25aAyR632daews1mZfHR97T4GfKmmtzx9Fe9ilVyo_Flp/exec';
        let postResponse = await fetch(postUrl);
        console.log("postResponse: ", postResponse);
        
    }

    return (
        <>
        <button onClick={handlePost}>POST</button>
        <hr />
            <table>
                <thead>
                    <tr>
                        {tableData?.cols?.map((col: any) => {
                            return <th key={col?.id}>{col?.label}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.rows?.map((row: any, i: number) => {
                        return (
                            <tr key={i}>
                                {row?.c?.map((cell: any) => {
                                    return <td key={cell?.v}>{cell?.f ?? cell?.v}</td>;
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
