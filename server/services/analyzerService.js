function countHashtags(text) {
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  return matches ? matches.length : 0;
}

function countEmojis(text) {
  const matches = text.match(
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu
  );

  return matches ? matches.length : 0;
}

function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasCallToAction(text) {
  const ctaPatterns = [
    /\bclick\b/i,
    /\blearn more\b/i,
    /\btry\b/i,
    /\bsubscribe\b/i,
    /\bfollow\b/i,
    /\bcomment\b/i,
    /\bshare\b/i,
    /\blike\b/i,
    /\bjoin\b/i,
    /\bdownload\b/i,
    /\bvisit\b/i,
    /\bcheck out\b/i,
    /\btell us\b/i,
    /\blet us know\b/i,
    /\bget started\b/i,
    /\bsign up\b/i,
    /\bcontact us\b/i,
    /\bbuy\b/i,
    /\bbook\b/i
  ];

  return ctaPatterns.some((pattern) => pattern.test(text));
}

function hasQuestion(text) {
  return text.includes("?");
}

function hasStrongHook(text) {
  const hookPatterns = [
    /\bdid you know\b/i,
    /\bwhy\b/i,
    /\bhow\b/i,
    /\bwhat if\b/i,
    /\bstop\b/i,
    /\bdiscover\b/i,
    /\bintroducing\b/i,
    /\bhere's why\b/i,
    /\bthe secret\b/i,
    /\b3 reasons\b/i,
    /\b5 reasons\b/i
  ];

  return hookPatterns.some((pattern) => pattern.test(text));
}

function calculateEngagementScore({
  wordCount,
  hashtagCount,
  emojiCount,
  hasCTA,
  questionPresent,
  strongHook
}) {
  let score = 50;

  // Content length
  if (wordCount >= 20 && wordCount <= 150) {
    score += 10;
  } else if (wordCount > 150 && wordCount <= 300) {
    score += 5;
  } else if (wordCount < 10) {
    score -= 10;
  } else if (wordCount > 500) {
    score -= 10;
  }

  // Hashtags
  if (hashtagCount >= 2 && hashtagCount <= 5) {
    score += 10;
  } else if (hashtagCount === 1) {
    score += 4;
  } else if (hashtagCount > 8) {
    score -= 8;
  }

  // Emojis
  if (emojiCount >= 1 && emojiCount <= 5) {
    score += 5;
  } else if (emojiCount > 10) {
    score -= 5;
  }

  // CTA
  if (hasCTA) {
    score += 10;
  }

  // Engagement hooks
  if (questionPresent) {
    score += 5;
  }

  if (strongHook) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

function generateSuggestions({
  text,
  wordCount,
  hashtagCount,
  emojiCount,
  hasCTA,
  questionPresent,
  strongHook
}) {
  const suggestions = [];

  // Content length
  if (wordCount < 10) {
    suggestions.push(
      "Add more context or value so the audience understands why the post matters."
    );
  } else if (wordCount < 20) {
    suggestions.push(
      "Consider expanding the post with one useful detail, benefit, or example."
    );
  } else if (wordCount > 500) {
    suggestions.push(
      "Consider shortening the content and moving secondary details into a follow-up post."
    );
  } else if (wordCount > 300) {
    suggestions.push(
      "Break longer sections into shorter paragraphs to make the post easier to scan."
    );
  }

  // Hashtags
  if (hashtagCount === 0) {
    suggestions.push(
      "Add 2-5 relevant hashtags to improve discoverability."
    );
  } else if (hashtagCount === 1) {
    suggestions.push(
      "Consider adding 1-3 more highly relevant hashtags to reach a broader audience."
    );
  } else if (hashtagCount > 8) {
    suggestions.push(
      "Reduce the number of hashtags and keep only the most relevant ones."
    );
  }

  // Emojis
  if (emojiCount === 0) {
    suggestions.push(
      "Consider adding 1-3 relevant emojis to make key points more visually engaging."
    );
  } else if (emojiCount > 10) {
    suggestions.push(
      "Reduce the number of emojis so they support the message without distracting from it."
    );
  }

  // CTA
  if (!hasCTA) {
    if (questionPresent) {
      suggestions.push(
        "Add a clear next step, such as asking readers to comment, share, or learn more."
      );
    } else {
      suggestions.push(
        "Add a clear call to action to encourage readers to take the next step."
      );
    }
  } else {
    suggestions.push(
      "Your post includes a call to action. Consider making it more specific and benefit-focused."
    );
  }

  // Hook
  if (!strongHook && wordCount >= 15) {
    suggestions.push(
      "Strengthen the opening with a question, surprising fact, benefit, or attention-grabbing statement."
    );
  }

  // Questions
  if (!questionPresent && wordCount >= 20) {
    suggestions.push(
      "Consider ending with a relevant question to encourage comments and discussion."
    );
  } else if (questionPresent) {
    suggestions.push(
      "The question can help encourage interaction. Make sure it is specific enough to invite useful responses."
    );
  }

  // Positive feedback when content is already strong
  if (
    wordCount >= 20 &&
    wordCount <= 300 &&
    hashtagCount >= 2 &&
    hashtagCount <= 5 &&
    emojiCount >= 1 &&
    emojiCount <= 5 &&
    hasCTA &&
    strongHook
  ) {
    suggestions.push(
      "The post has a strong combination of structure, discoverability, engagement elements, and a clear action."
    );
  }

  // Prevent too many suggestions
  return suggestions.slice(0, 5);
}

function analyzeContent(text) {
  const cleanText = text.trim();

  const wordCount = countWords(cleanText);
  const hashtagCount = countHashtags(cleanText);
  const emojiCount = countEmojis(cleanText);
  const hasCTA = hasCallToAction(cleanText);
  const questionPresent = hasQuestion(cleanText);
  const strongHook = hasStrongHook(cleanText);

  const engagementScore = calculateEngagementScore({
    wordCount,
    hashtagCount,
    emojiCount,
    hasCTA,
    questionPresent,
    strongHook
  });

  const suggestions = generateSuggestions({
    text: cleanText,
    wordCount,
    hashtagCount,
    emojiCount,
    hasCTA,
    questionPresent,
    strongHook
  });

  return {
    wordCount,
    hashtagCount,
    emojiCount,
    hasCallToAction: hasCTA,
    engagementScore,
    suggestions
  };
}

module.exports = {
  analyzeContent
};