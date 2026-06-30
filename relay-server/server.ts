import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const GENERATED_DIR = path.resolve(__dirname, '../storybook-app/src/components/Generated');

app.post('/generate', async (req, res) => {
  console.log('Received generate request:', Object.keys(req.body));

  // Hardcoded fake response — proves the write-triggers-HMR mechanic
  const componentName = 'StubCard';

  const componentCode = `export default function ${componentName}() {
  return (
    <div className="bg-teal-500 text-white p-6 rounded-xl max-w-sm">
      <h2 className="text-lg font-semibold">Stub component</h2>
      <p className="text-sm text-teal-100 mt-2">Written by relay server at ${new Date().toISOString()}</p>
    </div>
  )
}
`;

  const storyCode = `import ${componentName} from './${componentName}'

export default { title: 'Generated/${componentName}', component: ${componentName} }
export const Default = {}
`;

  await fs.mkdir(GENERATED_DIR, { recursive: true });
  await fs.writeFile(path.join(GENERATED_DIR, `${componentName}.tsx`), componentCode);
  await fs.writeFile(path.join(GENERATED_DIR, `${componentName}.stories.tsx`), storyCode);

  // Touch index.css so Tailwind's watcher invalidates the CSS module and
  // rescans the @source glob — this triggers a CSS HMR update in Storybook.
  const indexCssPath = path.resolve(__dirname, '../storybook-app/src/index.css');
  let css = await fs.readFile(indexCssPath, 'utf-8');
  css = css.replace(/\n?\/\* _tw-trigger: \d+ \*\/\n?$/, '');
  await fs.writeFile(indexCssPath, css.trimEnd() + `\n/* _tw-trigger: ${Date.now()} */\n`);

  res.json({ status: 'ok', componentName });
});

app.listen(4000, () => console.log('Relay server listening on: 4000'));
