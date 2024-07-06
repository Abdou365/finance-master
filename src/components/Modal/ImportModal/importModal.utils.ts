import * as date from 'date-fns';
import { v4 as uuid } from 'uuid';
import { convertDate } from '../../../utils/date.utils';

type NewType = Record<string, string>;

export const formatImportData = (keyMapping : NewType, data: Array<string|number>[] ): Record<string, any>[] => {
    
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
            value: 0,
            date : new Date().toISOString(),
        }; // Add index signature to rowData
        tableHeaders.forEach((header, index) => {
            if (keyMapping[header] === undefined) {
                return;
            }
            if (keyMapping[header] === "date" ) {    
                rowData[keyMapping[header]] = convertDate(row[index].toString());
                return;
            }
            if (keyMapping[header] === "value") {
                const value = +row[index]
                 if ((value as number) < 0) {
                    rowData["isExpense"] = true;
                    return rowData[keyMapping[header]] = value*-1;
                 } 
                    return rowData[keyMapping[header]] = value;
            }
            rowData[keyMapping[header]] = row[index];
        });
        return rowData;
    });
}