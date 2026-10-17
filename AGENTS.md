# Yori Jomo project guidance

## Figma is the design source
- Source file: https://www.figma.com/design/SqWU2i2Q8nCn5aBd4onWMA/Yori-Jomo?node-id=346-2568
- Before changing a design value, inspect the relevant Figma node, its variable bindings, and the resolved value. Do not estimate values from screenshots when the source is available.
- Use `figma-tokens.css` for exported variables and styles. Load it before `general.css` and `styling.css`.
- Prefer semantic tokens such as `--style-tokens-text-color-default` over raw colours. Preserve aliases with `var(...)` so primitive updates propagate.
- CSS names include the collection and normalized Figma name; comments record original names and variable IDs. Preserve this mapping when refreshing exports.
- Export all current modes if modes are added. Do not silently substitute missing aliases or assign units without checking what the variable represents.
- Keep Figma exports separate from project-only grid proportions, breakpoints and offsets. Do not claim an implementation value is a Figma token or choose an unrelated token merely because its number matches.
- User-requested visual overrides are allowed; document them separately rather than silently changing the exported token value.

## Images and typography
- Use the actual SVG assets exported from Figma. Do not redraw icons or override their strokes with CSS. External SVG images retain their exported colours; re-export them if their Figma colour changes.
- Export photo crops without text or decorative guides, convert them to WebP, and store them in `images/`. Keep labels in HTML and provide descriptive image alt text.
- Use Instrument Sans and its exported weight/size tokens for interface text. The font is loaded from Google Fonts with Arial as a fallback. The header uses the original desktop and mobile Figma logo SVGs; preserve these assets rather than replacing the logo with text.

## Keep this beginner-friendly
- Use plain HTML and CSS, with concise comments explaining the layout.
- Preserve the existing header and 24-column hero composition unless the user requests a layout change.
- Check image paths, token references, image dimensions, and desktop/mobile layouts after changes. Report any checks that could not be completed.
- Make changes directly within the user's requested scope; do not introduce frameworks or unnecessary approval steps.
