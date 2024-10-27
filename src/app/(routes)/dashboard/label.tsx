const LABEL = {
  user: {
    label: 'Người dùng',
    createLabel: 'Thêm người dùng',
    editLabel: 'Sửa người dùng',
    deleteLabel: 'Xóa người dùng',
    usernameLabel: 'Tên người dùng',
    emailLabel: 'Email',
    passwordLabel: 'Mật khẩu',
    confirmPassLabel: 'Xác nhận mật khẩu',
    statusLabel: 'Trạng thái',
    roleLabel: 'Vai trò',
    avatarLabel: 'Tải lên avatar',
    createdAtLabel: 'Ngày tạo',
    enterEmail: 'Nhập email',
    enterPassword: 'Nhập mật khẩu',
    checkboxRememerMe: 'Ghi nhớ mật khẩu',
  },
  author: {
    label: 'Tác Giả',
    createLabel: 'Thêm tác giả',
    editLabel: 'Sửa tác giả ',
    deleteLabel: 'Xóa tác giả',
    usernameLabel: 'Tên tác giả',
    describeLabel: "Mô tả",
    act: "Hành động",
    createdAtLabel: 'Ngày tạo',
    url: "URL"

  },
  sys: {
    forgotPasswordLabel: 'Quên mật khẩu?',
    loginLabel: 'Đăng nhập',
    loginToDashboardLabel: 'Đăng nhập vào trang quản lý',
    ASC: 'Tăng dần',
    DESC: 'Giảm dần',
    actionLabel: 'Hành động',
    id: 'ID',
    sortLabel: 'Sắp xếp',
    orderLabel: 'Thứ tự',
    appName: 'Web Truyện',
    searchLabel: 'Tìm kiếm ...',
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
      banned: 'Khóa',
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
