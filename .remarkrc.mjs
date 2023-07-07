import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide';

import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length';

export default {
    plugins: [
        remarkPresetLintConsistent,
        remarkPresetLintRecommended,
        remarkPresetLintMarkdownStyleGuide,
        [remarkLintMaximumLineLength, [1, 120]]

    ]
}