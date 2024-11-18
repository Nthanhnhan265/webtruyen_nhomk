const MESSAGE = {
  sys: {
    fetchError: 'Đã xảy ra lỗi khi lấy dữ liệu',
    loading: 'Đang tải dữ liệu...',
    unknownError: 'Lỗi không xác định',
    serverError: 'Lỗi từ máy chủ Node.js.',
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
  },
}

export default MESSAGE
