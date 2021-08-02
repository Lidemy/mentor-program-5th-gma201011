export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}

export function escapeOutput(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  const reg = /[&<>"'/]/ig
  return string.replace(reg, (match) => (map[match]))
}

export function appendCommentToDom(container, comment, isPrepend) {
  const html = `
    <div class="card mt-2">
      <div class="card-body">
        <h5 class="card-title">${comment.id}  ${escapeOutput(comment.nickname)}</h5>
          <p class="card-text">
            ${escapeOutput(comment.content)}
          </p>
      </div>
    </div>
    `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}
