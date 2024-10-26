// src/app/_api/login.api.ts

export const loginUser = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', { // Gọi tới API Next.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        // Xử lý các lỗi từ server
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đăng nhập thất bại');
      }
  
      return await response.json(); // Trả về dữ liệu JSON
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Bỏ qua lỗi để xử lý sau
    }
  };
  