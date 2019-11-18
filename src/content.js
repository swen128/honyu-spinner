const selector = {
  getChatDom: () => document.querySelector('yt-live-chat-app'),
};

const init = async () => {
  const chat = document.getElementById('chat');
  const spinner = document.createElement('img');
  spinner.src = chrome.extension.getURL('images/Ange.png');
  spinner.style.position = 'absolute';
  spinner.style.top = '0';
  spinner.style.right = '10%';
  spinner.style.height = '30%';
  chat.appendChild(spinner);

  const animation = spinner.animate([
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(360deg)'}
  ], {
    delay: 500,
    duration: 500,
    iterations: Infinity,
  });

  let nChatMessagesWithinThirtySeconds = 0;

  const observer = new MutationObserver(records => {
    let nNodes = 0;

    records.forEach(record => {
      record.addedNodes.forEach(node => {
        const nodeName = node.nodeName.toLowerCase();
        if (nodeName === 'yt-live-chat-text-message-renderer' || nodeName === 'yt-live-chat-paid-message-renderer') {
          nNodes += 1;
        }
      });
    });

    nChatMessagesWithinThirtySeconds += nNodes;
    animation.playbackRate = nChatMessagesWithinThirtySeconds / 100;

    setTimeout(() => {
      nChatMessagesWithinThirtySeconds -= nNodes;
      animation.playbackRate = nChatMessagesWithinThirtySeconds / 100;
    }, 30 * 1000);
  });

  observer.observe(selector.getChatDom(), {
    childList: true,
    subtree: true,
  });
};

init();
