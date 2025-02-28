type Params = Promise<{ competitionId: string }>;

export default async function CompetitionPage({ params }: { params: Params }) {
  const { competitionId } = await params;

  return <div>Competition - {competitionId}</div>;
}
