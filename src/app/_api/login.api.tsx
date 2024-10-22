// /pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface User {
    username: string;
    password: string;
}

const users: User[] = [
    { username: 'admin', password: 'admin123' }, // Tài khoản mẫu
    // Bạn có thể thêm các tài khoản khác ở đây
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Kiểm tra thông tin đăng nhập
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Nếu đăng nhập thành công
            return res.status(200).json({ message: 'Đăng nhập thành công', token: 'fake-jwt-token' });
        } else {
            // Nếu thông tin đăng nhập không hợp lệ
            return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không hợp lệ' });
        }
    } else {
        // Chỉ cho phép phương thức POST
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
