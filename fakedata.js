import xlsx from 'xlsx'
const workbook = xlsx.readFile('wallet.xlsx');
const sheet_name = workbook.SheetNames[0]; // Assuming you want to read the first sheet
const sheet = workbook.Sheets[sheet_name];
// Convert the sheet to JSON
const data = xlsx.utils.sheet_to_json(sheet);

console.log(data);
// var i = 0;
// for(let item of data){
//    let thumbnail = item.thumbnail;
//    let price = item.price;
//    let title = item.title;
//    let categoryName = item.categoryName;
//    let discountPercentage = item.discountPercentage;
//    let rating = item.rating;
//    console.log(thumbnail+" "+price+" "+title+" "+categoryName+" "+discountPercentage+" "+rating)
// }
    for(let item of data){
        let thumbnail = item.thumbnail;
        let price = item.price;
        let title = item.title;
        let categoryName = item.categoryName;
        let discountPercentage = item.discountPercentage;
        let rating = item.rating;
        let stock = 100;
        let brand = 'local';
        let images = 'NULL'
        console.log(thumbnail+" "+price+" "+title+" "+categoryName+" "+discountPercentage+" "+rating)
     }
