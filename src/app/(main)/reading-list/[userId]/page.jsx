import ReadingList from '../../../../components/reading-list';

export default async function ReadingListPage({ params }) {
  
  const { userId } = await params;
  console.log("Destructured userId:", userId);
  
  return <ReadingList userId={userId} />;
}