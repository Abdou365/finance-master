import * as date from 'date-fns';
import { v4 as uuid } from 'uuid';

type NewType = Record<string, string>;

export const formatImportData = (keyMapping : NewType, data: Array<string|number>[] ): Record<string, any>[] => {
    const isProbablyDate = new RegExp(/date/);
  const tableHeaders = data[0];
    const tableData = data.slice(1);
    return tableData.map((row) => {
        const rowData: Record<string, any> = {
            id: uuid(),
            category:"All",
            accountId: "",
            status: "published",
            userId: "",
            isExpense: false,
            date : new Date().toISOString(),
        }; // Add index signature to rowData
        tableHeaders.forEach((header, index) => {
            if (keyMapping[header] === undefined) {
                return;
            }
            if (keyMapping[header] === "date" ) {
                rowData[keyMapping[header]] = date.format(row[index], 'yyyy-MM-dd');
                return;
            }
            if (keyMapping[header] === "value") {
               if (typeof row[index] === "string") {
                 return rowData[keyMapping[header]] = 0;
               }
               if (typeof row[index] === "number") {
                 if ((row[index] as number) < 0) {
                    rowData["isExpense"] = true;
                    return rowData[keyMapping[header]] = (row[index] as number)*-1;
                 } 
                    return rowData[keyMapping[header]] = row[index];
               }
            }
            rowData[keyMapping[header]] = row[index];
        });
        return rowData;
    });
}