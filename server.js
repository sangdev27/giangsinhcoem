const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép tất cả origin (cần cho trang HTML từ Vercel)
app.use(cors());

// Phục vụ file tĩnh: nhạc và ảnh default nếu muốn
app.use('/music', express.static(path.join(__dirname, 'public/music')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Database giả đơn giản (thay bằng MongoDB/Redis nếu muốn scale)
const dataStore = {
  // Ví dụ một vài ID
  "12345": {
    senderName: "Anh yêu",
    messages: "iu em nhiều lắm\nMerry Christmas 2025\nChúc em luôn hạnh phúc bên anh\nCảm ơn em vì đã đến bên anh\nYêu em mãi mãi",
    // hoặc dùng mảng: messages: ["câu 1", "câu 2", ...],
    music: "TikDown.com_TikTok_Media_002_a36a703cbabc0874146559388b1ec2f7.mp3",  // file phải nằm trong public/music/
    images: [
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh-viet-nam-toc-dai.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.9F-3w9sVCDc05rZ1Z2bMTgHaJQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  "abcde": {
    senderName: "Bạn thân",
    messages: ["Chúc mừng Giáng sinh!", "Năm mới vui vẻ nhé!", "Luôn hạnh phúc"],
    music: "we-wish-you.mp3",
    images: []
  }
  // Thêm bao nhiêu ID tùy thích
};

// Route API
app.get('/api/noel/:id', (req, res) => {
  const id = req.params.id;
  const data = dataStore[id];

  if (data) {
    res.json({
      success: true,
      message: "Lấy dữ liệu thành công",
      data: data
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy ID"
    });
  }
});

// Route root (tùy chọn)
app.get('/', (req, res) => {
  res.send('Noel API đang chạy! 🎄');
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});