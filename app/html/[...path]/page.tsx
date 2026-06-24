import { redirect } from 'next/navigation';

export default async function HtmlPage({ params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const filePath = '/' + resolvedParams.path.join('/');
  const finalPath = filePath.endsWith('.html') ? filePath : filePath + '.html';
  
  redirect(finalPath);
}
