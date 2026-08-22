const analyzeContent = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean);

  const hashtags = text.match(/#\w+/g) || [];

  const emojis =
    text.match(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu
    ) || [];

  const ctaWords = [
    "click",
    "visit",
    "comment",
    "share",
    "follow",
    "buy",
    "learn more",
    "sign up",
    "check out",
    "download"
  ];

  const lowerText = text.toLowerCase();

  const hasCallToAction = ctaWords.some((word) =>
    lowerText.includes(word)
  );

  const suggestions = [];
  let score = 100;

  if (hashtags.length === 0) {
    suggestions.push(
      "Add 2-5 relevant hashtags to improve discoverability."
    );
    score -= 10;
  }

  if (emojis.length === 0) {
    suggestions.push(
      "Consider adding emojis to make the post more visually engaging."
    );
    score -= 10;
  }

  if (!hasCallToAction) {
    suggestions.push(
      "Add a clear call-to-action, such as asking users to comment, share, or visit a link."
    );
    score -= 15;
  }

  if (words.length < 20) {
    suggestions.push(
      "Consider adding more context to make the post more informative."
    );
    score -= 10;
  }

  if (words.length > 300) {
    suggestions.push(
      "Consider shortening the content for better readability."
    );
    score -= 10;
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your content has a good engagement structure. Consider testing different opening hooks."
    );
  }

  return {
    wordCount: words.length,
    hashtagCount: hashtags.length,
    emojiCount: emojis.length,
    hasCallToAction,
    engagementScore: Math.max(score, 0),
    suggestions
  };
};

module.exports = {
  analyzeContent
};