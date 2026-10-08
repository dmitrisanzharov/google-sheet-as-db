export async function getSheetData(sheetId: string, sheetName: string) {
    console.log('sheetName: ', sheetName);
    console.log('sheetId: ', sheetId);

    const params = new URLSearchParams({
        sheet: sheetName,
        tq: "WHERE B = 'Vader'"
    });

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq` + `?${params}`;

    const response = await fetch(url);
    console.log('response: ', response);

    const text = await response.text();
    console.log('text: ', text);

    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)![1]);
    console.log('============================');
    console.log('json: ', json);
    console.log('isParsed ', json.table.parsedNumHeaders);
    console.log('json: cols', json.table.cols);
    console.log('json: rows', json.table.rows);

    return json.table;
}
