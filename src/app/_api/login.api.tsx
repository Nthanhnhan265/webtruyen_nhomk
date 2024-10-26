import { NextApiRequest, NextApiResponse } from 'next';

// Một ví dụ về dữ liệu tài khoản mặc định để test
const DEFAULT_USER = {
  username: 'admin',
  password: 'admin123',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Kiểm tra thông tin đăng nhập
    if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
      return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
