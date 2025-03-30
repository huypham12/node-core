// LƯU NHỮNG NOTE VÀO ĐÂY



/* CƠ CHẾ HOẠT ĐỘNG CỦA REQUIRE

1. Kiểm tra module có trong bộ nhớ cache không. Nếu có, sẽ lấy từ cache thay vì tải lại.
2. Nếu module chưa có trong cache, Node.js sẽ tìm module đó. Nếu không tìm thấy, sẽ báo lỗi.
3. Nếu tìm thấy, Node.js sẽ biên dịch module bằng cách bọc nó trong một hàm ẩn 
   (Immediately Invoked Function Expression - IIFE) để tránh xung đột phạm vi biến.
4. Node.js thực thi module ngay sau khi bọc, nhưng chỉ thực thi **một lần duy nhất**.
   Sau đó, module sẽ được lưu vào `require.cache` để tối ưu hiệu suất.
5. Lần sau khi gọi `require()`, module sẽ được lấy từ cache thay vì chạy lại.

*/




/* OS MODULE  
   os module cung cấp các built-in functions để tương tác với hệ điều hành.  
   Điều này hữu ích khi chạy code trên nhiều môi trường khác nhau  
   hoặc cần tối ưu cấu hình server theo tài nguyên hệ thống.  
*/
const os = require('os')

const user = os.userInfo()
console.log(user) // trả về thông tin người dùng 

console.log(os.type())
// END OS moudule

// PATH MODULE

const path = require('path')

// Tạo đường dẫn chuẩn trên mọi hệ điều hành (Windows, Linux, macOS)
const textPath = path.join('content', 'subfolder', 'text.txt')
console.log(textPath)
// Windows: content\subfolder\text.txt
// Linux/macOS: content/subfolder/text.txt

// Chuyển đường dẫn thành tuyệt đối
const absolutePath = path.resolve(__dirname, textPath)
console.log(absolutePath)
// Windows: C:\Users\...\project\content\subfolder\text.txt
// Linux/macOS: /Users/.../project/content/subfolder/text.txt

// END PATH MODULE

// FS MODULE
const fs = require('fs')
const path = require('path')

const firstFile = path.join('content', 'subfolder', 'first.txt')
const secondFile = path.join('content', 'subfolder', 'second.txt')

// ---- ĐỌC & GHI FILE ĐỒNG BỘ (BLOCKING) ----
// Chặn toàn bộ chương trình cho đến khi đọc/ghi hoàn thành

// Đọc file
const data = fs.readFileSync(firstFile, 'utf8') // Chuyển buffer về chuỗi
console.log('Dữ liệu trong firstFile:', data)

// Ghi đè file
fs.writeFileSync(secondFile, 'Đây là nội dung mới cho file 2')
console.log('Ghi đè thành công')

// ---- ĐỌC & GHI FILE BẤT ĐỒNG BỘ (NON-BLOCKING) ----
// Không chặn luồng chương trình, các thao tác sẽ chạy song song

// Đọc file (thực thi sau cùng nếu chưa hoàn thành)
fs.readFile(secondFile, 'utf8', (err, data) => {
  if (err) {
    console.log('Lỗi đọc file:', err)
    return
  }
  console.log('Dữ liệu trong secondFile:', data)
})

// Ghi đè file (có thể chạy trước khi đọc file trên hoàn thành)
fs.writeFile(firstFile, 'File 1 đã được ghi mới', 'utf8', (err) => {
  if (err) {
    console.log('Lỗi ghi file:', err)
    return
  }
  console.log('Ghi file thành công')
})

// việc code có thể chạy trước hoặc sau mà mình không biết đó là do bất động bộ
// vì vậy việc xử lý bất đồng bộ là rất quan trọng
// chẳng hạn như chưa lấy được data mà đã đòi dùng chẳng hạn
// thế mới cần mấy cái async/await

// END FS MODULE

// HTTP module
const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(req.url) // Request chứa nhiều thông tin. Express đóng gói sẵn thành req.body, req.params... đỡ phải cấu hình thủ công

  // Kiểm tra route 
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html')

    // Đọc file tĩnh, tương tự express.static nhưng thủ công hơn, express tối ưu việc đọc file tĩnh
    // sẵn cho m
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        return res.end('Lỗi server')
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found') // Kết thúc phản hồi
  }
})

// Khởi động server
server.listen(3000, () => {
  console.log('Server chạy tại cổng 3000')
})

// END HTTP module










console.log(__dirname)  
// → Trả về đường dẫn tuyệt đối của thư mục chứa file này,  
//    không phụ thuộc vào file đang được thực thi.

console.log(__filename)  
// → Trả về đường dẫn tuyệt đối của chính file này.


// ESM module
// đm node vẫn hỗ trợ mặc dịnh commom js ạ:))) giờ phải thêm module vào pageage.json mới đc

// import { getName } from "./name.js";

// getName()

// console.log(import.meta)

// NGHỊCH TÍ THÔI CHỨ CHẮC VẪN DÙNG COMMOM JS tại giờ đag học nó cx dạy với lại nó chưa bị khai tử hẳn


// COMMON JS module

// console.log(module)

/* Kết quả

{
  id: '.',
  path: 'D:\\NodeJS\\NodeJS-core-module',
  exports: {},
  filename: 'D:\\NodeJS\\NodeJS-core-module\\app.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\NodeJS\\NodeJS-core-module\\node_modules',
    'D:\\NodeJS\\node_modules',
    'D:\\node_modules'
  ],
  [Symbol(kIsMainSymbol)]: true,
  [Symbol(kIsCachedByESMLoader)]: false,
  [Symbol(kFormat)]: 'commonjs',
  [Symbol(kIsExecuting)]: true
}

cái exports trong module ban đầu là một dối tượng rỗng
còn nếu viết exports thì exports đại diện cho module.exports, cái exports này sẽ tham chiếu đến
module.exports.
Vì vậy không nên gán trực tiếp cái exports thành một object mới vì nó sẽ mất tham chiếu 
tới module.export cái mà module sẽ xuất ra ngoài để sử dụng
*/

// xuất tất cả trong một đối tượng module.exports
// dùng trong tiêu chuẩn cũ:))) mịa vừa hiểu xong đã phải đổi sang esm

