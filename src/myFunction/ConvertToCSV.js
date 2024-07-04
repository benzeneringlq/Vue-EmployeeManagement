// JSON to CSV Converter
import { writeFile, utils } from 'xlsx';
function ConvertToCSV(headers, objArray, fileName) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    const worksheet = utils.json_to_sheet(array);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Dates");
    utils.sheet_add_aoa(worksheet, [headers.map((item)=>item.title)], { origin: "A1" });
    writeFile(workbook,fileName);
}
export default ConvertToCSV