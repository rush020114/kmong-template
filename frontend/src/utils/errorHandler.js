export function handleError(e, useAlert = false) {
  if (typeof e.response?.data === 'object') {
    const messages = Object.values(e.response.data).join('\n');
    useAlert ? alert(messages) : console.error(messages);
  } else {
    const message = e.response?.data || e.message;
    useAlert ? alert(message) : console.error(message);
  }
}