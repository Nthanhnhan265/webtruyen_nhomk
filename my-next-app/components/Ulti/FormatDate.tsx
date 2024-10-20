const formatDate = (dateString: string) => {
  const options: Object = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // hour12: false,
    dayStyle: 'short',
  }
  return new Date(dateString).toLocaleString('vi-VN', options)
}

export default formatDate