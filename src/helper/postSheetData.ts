const deploymentId = 'AKfycbyX3lv0C-5-BiCCovQmxUu2NhkQ_-kjtGW2Slx0N8rGCrePLIiu_P6NxJmZdmxY0yAl';

const finalUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

export type SheetRow = { id: number; name: string; second: string };

export async function postSheetData(data: SheetRow) {
    return fetch(finalUrl, { method: 'POST', body: JSON.stringify(data) });
}
