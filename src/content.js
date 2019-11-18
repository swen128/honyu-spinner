const selector = {
  chatItemsDom: document.querySelector('yt-live-chat-app'),
  chatDom: document.getElementById('chat'),
};

const isChatMessage = node => {
  const name = node.nodeName.toLowerCase();
  return name === 'yt-live-chat-text-message-renderer' || name === 'yt-live-chat-paid-message-renderer';
};

const init = async () => {
  const chat = selector.chatDom;
  const spinner = document.createElement('img');
  spinner.src = chrome.extension.getURL('images/Ange.png');
  spinner.style.position = 'absolute';
  spinner.style.top = '0';
  spinner.style.right = '15%';
  spinner.style.height = '40%';
  chat.appendChild(spinner);

  const animation = spinner.animate([
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(360deg)'}
  ], {
    delay: 500,
    duration: 500,
    iterations: Infinity,
  });

  let numLatestChatMessages = 0;
  const updateRate = numAddedChatMessages => {
    numLatestChatMessages += numAddedChatMessages;
    animation.playbackRate = numLatestChatMessages / 30;
  };

  const observer = new MutationObserver(records => {
    const nodes = records.flatMap(record => Array.from(record.addedNodes));
    const numChatMessages = nodes.filter(isChatMessage).length;

    updateRate(numChatMessages);
    setTimeout(updateRate,10 * 1000, -numChatMessages);
  });

  observer.observe(selector.chatItemsDom, {
    childList: true,
    subtree: true,
  });
};

init();
