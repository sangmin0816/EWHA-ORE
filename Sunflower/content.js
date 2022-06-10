function checkPage() {
  var ready_state = document.readyState;

  // comments load at this state and when users scroll down further
  if (ready_state == "complete") {
    var comments = document.querySelectorAll(
      "#content-text, #content-text > span"
    );

    // Key: Default
    chrome.storage.sync.get(
      { list: [], case_sens: false, exact: false },
      function (data) {
        // Checks if list is empty or contains 1 element of ""
        if (data.list.length <= 1 && !data.list[0].trim()) {
          return;
        }

        comments.forEach(function (comment) {
          for (let i = 0; i < data.list.length; i++) {
            if (
              !isSpoilerAlready(comment) &&
              checkWord(data.list[i], comment.innerText, data)
            ) {
              comment.innerHTML =
                "<details><summary>SPAM</summary>" +
                comment.innerHTML +
                "</details>";
              break;
            }
          }
        });
      }
    );
  }
}

function checkWord(word, str, data) {
  const allowedSeparator = "\\s,.;\n\r\"'|:-?";

  if (data.exact && data.case_sens) {
    const regex = new RegExp(`.*\\b${word}\\b.*`);
    return regex.test(str);
  } else if (data.exact) {
    const regex = new RegExp(`.*\\b${word}\\b.*`, "i");
    return regex.test(str);
  } else if (data.case_sens) {
    return str.includes(word);
  } else {
    return str.toLowerCase().includes(word.toLowerCase());
  }
}

// avoids problem with <details open>
function isSpoilerAlready(comment) {
  return comment.innerHTML.startsWith("<details");
}

function checkState() {
  chrome.storage.sync.get({ state: false }, function (data) {
    console.log(data.state);
    if (data.state) {
      checkPage();
    }
  });
}

setInterval(checkState, 1000);
