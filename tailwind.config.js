// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Rất quan trọng: Đảm bảo Tailwind quét các file HTML và TypeScript của bạn
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Ví dụ: Màu primary của bạn
        // ... các màu tùy chỉnh khác
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'], // Định nghĩa font Pacifico
      },
      borderRadius: {
        'button': '0.375rem', // Tùy chỉnh radius cho !rounded-button nếu cần
      }
    },
  },
  plugins: [],
}