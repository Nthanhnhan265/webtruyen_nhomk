const MESSAGE = {
  sys: {
    fetchError: 'Đã xảy ra lỗi khi lấy dữ liệu',
    loading: 'Đang tải dữ liệu...',
    unknownError: 'Lỗi không xác định',
    serverError: 'Lỗi từ máy chủ Node.js.',
    noAccessToken: 'Thiếu token truy cập. Vui lòng đăng nhập lại.',
  },
  file: {
    noFileSelected: 'Chưa chọn tệp tin nào',
    fileSizeExceeded: 'Kích thước tệp tin phải nhỏ hơn {maxSize}MB',
    invalidFileType: 'Loại tệp tin không hợp lệ',
  },
  auth: {
    updateSuccess: 'Cập nhật thông tin thành công',
    accessTokenMissing: 'Thiếu token truy cập. Vui lòng đăng nhập lại.',
    updatePasswordSuccess: 'Cập nhật mật khẩu thành công.',
    updatePasswordFailed: 'Cập nhật mật khẩu thất bại.',
    loginRedirect: 'Bạn cần đăng nhập để tiếp tục.',
    unexpectedError: 'Đã xảy ra lỗi không mong muốn.',
    loginSuccess: 'Đăng nhập thành công',
    loginFailed: 'Đăng nhập thất bại',
    nameExists: 'Tên đăng nhập đã tồn tại',
    emailExists: 'Tên đăng nhập đã tồn tại',
    passwordNotMatch: 'Mật khẩu không khớp',
  },
  chapter: {
    createSuccess: 'Tạo chương mới thành công.',
    createFailed: 'Tạo chương mới thất bại.',
    updateSuccess: 'Cập nhật chương thành công.',
    updateFailed: 'Cập nhật chương thất bại.',
    deleteSuccess: 'Xóa chương thành công.',
    deleteFailed: 'Xóa chương thất bại.',
  },
}

export default MESSAGE
