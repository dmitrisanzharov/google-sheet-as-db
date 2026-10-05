export async function getSheetData(sheetId: string, sheetName: string) {
    const url =
        `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`

    const response = await fetch(url);
    // console.log("response: ", response);

    const text = await response.text();
    // console.log("text: ", text);

    const json = JSON.parse(
        text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)![1],
    );
    console.log("json: ", json.table.cols);


    // return json.table.rows;
}