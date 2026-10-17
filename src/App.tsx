import { useState, useEffect } from 'react';

const sheetId = '1YUgFc_TNMsN__ZV6rqFOeCnTyF8jGW0oBeKBqFjWXPM';
const sheetName = '';

const baseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
// const baseQuery = `?sheet=${encodeURIComponent(sheetName)}`

const useGetData = () => {

  console.log('re-rendered');

    const [data, setData] = useState<any>({});

    useEffect(() => {
        async function triggerFetch() {
            const response = await fetch(baseUrl);
            // console.log('response: ', response);

            const text = await response.text();
            // console.log('text: ', text);

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

    return (
        <>
            <h1>hello</h1>
        </>
    );
}

export default App;
