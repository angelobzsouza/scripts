const readline = require('readline');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2]
const filePath = path.join(
  process.env.HOME,
  'Music',
  'Gravações',
  'Outros',
  'CapCut Drafts',
  projectName,
  'draft_content.json'
);
const input = require(filePath);

let subtitles = input.materials.texts.filter(text => text.text_color == '#ff84ee')

const subAnimations = input.materials.material_animations.filter((animation) => {
  let animations = animation.animations[0];
  if (animations && animations.name == "Typewriter") {
    const text = subtitles.shift()
    const duration = text.words.end_time[text.words.end_time.length - 1] - text.words.start_time[0]
    animations.duration = parseInt(duration.toString().padEnd(7, '0'))
  }
  return animation
})

input.materials.material_animations = subAnimations;

fs.writeFileSync(filePath, JSON.stringify(input));
