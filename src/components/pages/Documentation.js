import React from "react";

const Documentation = () => (
  <div className="documentation">
    <h1>Documentation</h1>
    <div>
      We have intentionally left things pretty generic so you can write your
      campaign however you'd like without a specific rule system or setting.
      That means you can focus on what you do best, create!
    </div>
    <h4>Creating/Selecting a Campaign</h4>
    <p>
      Click on the quill icon in the sidebar. This will open a popup window
      which lists the available campaigns. To create a new campaign, simply
      click the +Add a New Item button. Next, fill out the form with your
      campaign name and setting. These are left wide-open intentionally so you
      can identify these however you'd like. To access the notes from a
      campaign, click on the campaign you'd like to enter.
    </p>
    <h4>Creating a New Note/Location/NPC</h4>
    <p>
      Creating a new item is simple. You can click on the appropriate icon in
      the navbar which will display the existing items of that type. Next, click
      the +Add a New Item button and fill out the title and content fields. The
      content fields use a special syntax called "Markdown". This means that you
      can write your notes very quickly without interrupting your train of
      thought. You can see more about this{" "}
      <a
        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .
    </p>
  </div>
);
export default Documentation;
