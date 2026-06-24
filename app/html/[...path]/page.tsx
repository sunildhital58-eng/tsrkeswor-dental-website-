import fs from 'fs';
import path from 'path';

export default async function HtmlPage({ params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const htmlPath = path.join(process.cwd(), 'public', ...resolvedParams.path);
  const htmlFile = htmlPath.endsWith('.html') ? htmlPath : htmlPath + '.html';

  try {
    const content = fs.readFileSync(htmlFile, 'utf-8');
    
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  } catch (error) {
    return (
      <div>
        <h1>पृष्ठ नभेटिएको</h1>
        <p>माफ गर्नुहोस्, यो पृष्ठ भेटिएन।</p>
      </div>
    );
  }
}
