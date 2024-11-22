const LABEL = {
  auth: {},
  sys: {
    joinedAt: 'Ngày tham gia:',
    appName: 'Web Truyện',
    edit: 'Sửa',
    delete: 'Xóa',
    create: 'Tạo mới',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    role: {
      admin: 'Quản trị viên',
      user: 'người dùng',
    },
    statusAccount: {
      active: 'Hoạt động',
      banned: 'Bị khóa',
    },
  },
}

export default LABEL
/* 
còn việc : 
làm tính năng: thêm , xóa ,sửa , 
  + làm form 
  + validate dữ liệu với hook form, 
  + gửi lên api 
  + load lại dữ liệu và thông báo
  + thông báo

  Phân trang
  sắp xếp
  Tìm kiếm

  validate dữ liệu với joi ở backend

*/
