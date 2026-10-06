import { useState, useEffect } from 'react';
import { getSheetData } from './helper/getSheetData';

const SHEET_ID = '1oSCUXEqqMAtAPYxDP-WLAjnG9h2wk1wDlrGjBFFYGJI';
const SHEET_NAME = 'Sheet2';

function App() {
    const [tableState, setTableState] = useState<any | null>({});

    useEffect(() => {
        getSheetData(SHEET_ID, SHEET_NAME).then((result) => {
            console.log('result', result);
            setTableState(result);
        });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    {tableState?.cols?.map((item: any) => (
                        <th key={item.id}>{item.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableState?.rows?.map((rowItem: any, index: number)=> {
                    console.log('rowItem', rowItem);
                    return <tr key={index}>
                        {rowItem?.c?.map((rowCell: any, index: any)=> {
                            console.log("rowCell: ", rowCell);
                            return <td key={index + rowCell?.v}>{rowCell?.f ?? rowCell?.v}</td>
                            
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default App;
