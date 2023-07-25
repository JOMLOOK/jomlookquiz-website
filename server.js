const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

// Middleware to parse JSON data
app.use(bodyParser.json());

// Handle form submissions
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // 将表单数据保存到Excel文件
  writeToExcel(formData);

  // 你可以根据需要返回一些数据给前端
  res.json({ message: 'Form data saved successfully!' });
});

function writeToExcel(formData) {
  // 创建一个新的工作簿和工作表
  const workbook = new exceljs.Workbook();
  const sheet = workbook.addWorksheet('Form Submissions');
  
  // 添加表头
  sheet.addRow(['Staff Code', 'Name', 'Branch']);
  
  // 将表单数据添加到工作表中
  sheet.addRow([formData.staffCode, formData.name, formData.branch]);
  
  // 保存Excel文件
  workbook.xlsx.writeFile('form_submissions.xlsx');
}

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
