import Toastify from 'toastify-js'

export default function showToast ({ text, style, callback }) {
  Toastify({
    text,
    duration: 2000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: false,
    gravity: 'bottom', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: style || {
      background: 'red'
    },
    onClick: () => callback ? callback() : null // Callback after click
  }).showToast()
}
