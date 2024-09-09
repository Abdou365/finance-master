import { formatImportData } from "./importModal.utils";

const keyMapping = {
    "Nom": "title",
    "Description": "description",
    "Date": "effect_date",
    "Valeur": "value",
    "Catégorie": "category",
    "Type": "isExpense",
};
const data = [
    ["Nom", "Description", "Date", "Valeur", "Catégorie", "Type"],
    ["Test", "Test", "2021-08-01", "100", "Test", "true"],
    ["Second", "Second", "2021-08-01", "100", "Test", "true"],
];
describe("Format Import Data to Table Data", () => { 
    it("should format import data to table data", () => {
        const result = formatImportData(keyMapping, data);
        expect(result).toEqual([
            {
                title: "Test",
                description: "Test",
                effect_date: "2021-08-01",
                value: "100",
                category: "Test",
                isExpense: "true",
            },
            {
                title: "Second",
                description: "Second",
                effect_date: "2021-08-01",
                value: "100",
                category: "Test",
                isExpense: "true",
            },
        ]);
    }   )

 })