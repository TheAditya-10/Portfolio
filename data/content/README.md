# Content Workflow

This folder is the single place to manage expandable portfolio content.

## Projects
- File: `projects/projects.json`
- Add a new object with a unique `id`.
- Set `flagship: true` to show the project on the homepage flagship section.
- Use `track` to group projects on `/projects`:
  - `major`
  - `hackathon`
  - `learning`
- Write the detailed project context in `data/projects/<project-id>.md` and set `caseStudy` to that path.

## Certifications
- File: `certifications/certifications.json`
- Add certificates as list entries with `title`, `issuer`, `date`, and `link`.

## Research
- File: `research/research.json`
- Keep empty until you want to publish research.
- Once entries exist, you can re-enable the `ResearchSection` in pages.

## Commit workflow
1. Update these JSON files.
2. (Optional) Add corresponding markdown case study under `data/projects/`.
3. Commit changes.
