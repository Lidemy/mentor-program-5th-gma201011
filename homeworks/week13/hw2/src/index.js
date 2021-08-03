import $ from 'jquery'
// eslint-disable-next-line import/no-unresolved
import { getComments, addComments } from './api'
import { appendCommentToDom, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './template'

export default function init(options) {
  let containerElement = null
  let commentDom = null
  let lastId = null
  let isEnd = false

  const { siteKey } = options
  const { apiUrl } = options
  const loadMoreClassName = `${siteKey}-load-more`
  const commentsClassName = `${siteKey}-comments`
  const formClassName = `${siteKey}-add-comment-form`
  const commentsSelector = `.${commentsClassName}`
  const formSelector = `.${formClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  commentDom = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', '.loadMoreClassName', () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    const nicknameDom = $(`${formSelector} input[name = nickname]`)
    const contentDom = $(`${formSelector} textarea[name = content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        return alert(data.message)
      }
      nicknameDom.val('')
      contentDom.val('')
      appendCommentToDom(commentDom, newCommentData, true)
    })
  })

  function getNewComments() {
    const commentDom = $(commentsSelector)
    $('.loadMoreClassName').hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        return alert(data.message)
      }
      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDom(commentDom, comment)
      }
      if (comments.length === 0) {
        isEnd = true
        $('.load-more').hide()
        $(commentsSelector).append('<div class = "mt-3">已無更多留言！</div>')
      } else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
