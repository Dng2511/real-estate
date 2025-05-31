const path = require('path');
const fs = require('fs');

exports.getImage = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../../../uploads', fileName);

  // Kiểm tra ảnh có tồn tại không
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Ảnh không tồn tại.' });
    }
    // Gửi ảnh về client
    res.sendFile(filePath);
  });
};