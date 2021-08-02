/* eslint-disable */

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var commentPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"addComments\": () => (/* binding */ addComments)\n/* harmony export */ });\n\n\nfunction getComments(apiUrl, siteKey, before, cb) {\n    let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`\n    if (before) {\n      url += `&before=${before}`\n    }\n    $.ajax({\n      url,\n    }).done(function(data) {\n      cb(data)\n    });\n}\n\nfunction addComments(apiUrl, siteKey, data, cb) {\n    $.ajax({\n        type: 'POST',\n        url: `${apiUrl}/api_add_comments.php`,\n        data,\n        success:\n          function (data) {\n            cb(data)\n          }\n    });\n}\n\n//# sourceURL=webpack://commentPlugin/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ \"./src/template.js\");\n\n\n\n\nfunction init(options) {\n  let siteKey = ''\n  let apiUrl = ''\n  let containerElement = null\n  let commentDom = null\n  let lastId = null\n  let isEnd = false\n  let loadMoreClassName\n  let commentsClassName\n  let commentsSelector\n  let formClassName\n  let formSelector\n  \n  siteKey = options.siteKey\n  apiUrl = options.apiUrl\n  loadMoreClassName = `${siteKey}-load-more`\n  commentsClassName = `${siteKey}-comments`\n  formClassName = `${siteKey}-add-comment-form`\n  commentsSelector = '.' + commentsClassName\n  formSelector = '.' + formClassName\n\n  containerElement = $(options.containerSelector)\n  containerElement.append((0,_template__WEBPACK_IMPORTED_MODULE_2__.getForm)(formClassName, commentsClassName))\n  ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendStyle)(_template__WEBPACK_IMPORTED_MODULE_2__.cssTemplate)\n\n\n  commentDom = $(commentsSelector)\n  getNewComments()\n\n  $(commentsSelector).on('click', '.' + loadMoreClassName, () => {\n    getNewComments()\n  })\n\n\n  $(formSelector).submit(e => {\n    const nicknameDom = $(`${formSelector} input[name = nickname]`)\n    const contentDom = $(`${formSelector} textarea[name = content]`)\n    const newCommentData = {\n      site_key: siteKey,\n      nickname: nicknameDom.val(),\n      content: contentDom.val()\n    }\n    ;(0,_api__WEBPACK_IMPORTED_MODULE_0__.addComments)(apiUrl, siteKey, newCommentData, data => {\n      if (!data.ok) {\n        return alert(data.message)\n      }\n      nicknameDom.val('')\n      contentDom.val('')\n      ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDom)(commentDom, newCommentData, true)\n    })\n  })  \n  \n  function getNewComments() {\n    const commentDom = $(commentsSelector)\n    $('.' + loadMoreClassName).hide()\n    if (isEnd) {\n      return\n    }\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, lastId, data => {\n      if (!data.ok) {\n          return alert(data.message)\n        }\n        const comments = data.discussions;\n        for (let comment of comments) {\n          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDom)(commentDom, comment)\n        }\n        let length = comments.length\n        if (length === 0) {\n          isEnd = true\n          $('.load-more').hide()\n          $(commentsSelector).append('<div class = \"mt-3\">已無更多留言！</div>')\n        } else {\n          lastId = comments[length - 1].id\n          const loadMoreButtonHTML = (0,_template__WEBPACK_IMPORTED_MODULE_2__.getLoadMoreButton)(loadMoreClassName)\n          $(commentsSelector).append(loadMoreButtonHTML)\n        }\n    })\n  }\n}  \n\n\n\n\n\n//# sourceURL=webpack://commentPlugin/./src/index.js?");

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cssTemplate\": () => (/* binding */ cssTemplate),\n/* harmony export */   \"getForm\": () => (/* binding */ getForm),\n/* harmony export */   \"getLoadMoreButton\": () => (/* binding */ getLoadMoreButton)\n/* harmony export */ });\nconst cssTemplate = '.card { margin-top:12px; }'\n\nfunction getForm(className, commentsClassName) {\n  return `\n  <div>\n    <form class=\"${className}\">\n      <div class=\"form-group\">\n        <label for=\"form-nickname\">暱稱</label>\n        <input name=\"nickname\" type=\"text\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <label>留言內容</label>\n        <textarea name=\"content\" class=\"form-control\" rows=\"3\"></textarea>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary mt-2\">送出</button>\n    </form>\n    <div class=\"${commentsClassName} mb-5\">\n  </div>\n`\n}\n\nfunction getLoadMoreButton(className) {\n  return `<button class = \"${className} btn btn-primary mt-3\">載入更多</button>`\n}\n\n//# sourceURL=webpack://commentPlugin/./src/template.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"appendStyle\": () => (/* binding */ appendStyle),\n/* harmony export */   \"escapeOutput\": () => (/* binding */ escapeOutput),\n/* harmony export */   \"appendCommentToDom\": () => (/* binding */ appendCommentToDom)\n/* harmony export */ });\nfunction appendStyle(cssTemplate) {\n  const styleElement = document.createElement('style')\n  styleElement.type = 'text/css'\n  styleElement.appendChild(document.createTextNode(cssTemplate))\n  document.head.appendChild(styleElement)\n}\n\nfunction escapeOutput(toOutput) {\n    return toOutput.replace(/\\&/g, '&amp;')\n      .replace(/\\</g, '&lt;')\n      .replace(/\\>/g, '&gt;')\n      .replace(/\\\"/g, '&quot;')\n      .replace(/\\'/g, '&#x27')\n      .replace(/\\//g, '&#x2F');\n}\n\nfunction appendCommentToDom(container, comment, isPrepend) {\n    const html = `\n      <div class=\"card mt-2\">\n            <div class=\"card-body\">\n              <h5 class=\"card-title\">${comment.id}  ${escapeOutput(comment.nickname)}</h5>\n              <p class=\"card-text\">\n                ${escapeOutput(comment.content)}\n              </p>\n            </div>\n          </div>\n    `\n    if (isPrepend) {\n      container.prepend(html)\n    } else {\n      container.append(html)\n    }\n}    \n\n\n//# sourceURL=webpack://commentPlugin/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	commentPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;