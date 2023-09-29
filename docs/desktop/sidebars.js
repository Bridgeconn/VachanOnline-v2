/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  vachan: [
    "Introduction",
    "websiteNavigation",
    {
      type: "category",
      label: "Features",
      collapsed: false,
      link: {
        type: "generated-index",
      },
      items: [
        "studyBible",
        "readBible",
        "signLanguageBible",
        "searchBible",
        "songs",
        "bibleStories",
        "commentaries",
        "infographics",
        "audioBible",
        "videos",
        "readingPlans",
        "dictionaries",
      ],
    },
    {
      type: "category",
      label: "User Login Features ",
      link: {
        type: "generated-index",
      },
      items: [
        "signUp",
        "signIn",
        "bookmarks",
        "highlights",
        "notes",
        "signOut",
      ],
    },
    "about",
  ],
};
