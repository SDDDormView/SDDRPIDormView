import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DormDetailPage({ params }: Props) {
  const { id } = await params;
  const dormName = decodeURIComponent(id);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="h-18 bg-black" />

      <div className="max-w-3xl mx-auto p-8 space-y-6">
        <Link href="/dorms" className="inline-block px-4 py-2 bg-white rounded shadow hover:shadow-lg transition-shadow">
          ← Back to Dorms
        </Link>

        <h1 className="text-4xl font-bold">{dormName}</h1>

        <img
          src="/fieldrpi.jpg"
          alt={dormName}
          className="w-full h-64 object-cover rounded"
        />

        <section className="bg-white rounded p-6 shadow space-y-3">
          <h2 className="text-2xl font-semibold">Details</h2>
          <p>Nearest dining hall: Commons</p>
          <p>A/C: No</p>
          <p>Elevator: No</p>
        </section>

        <section className="bg-white rounded p-6 shadow space-y-3">
          <h2 className="text-2xl font-semibold">Tags</h2>
          <p>ethernet, bike rack, elevator</p>
        </section>
      </div>
    </main>
  );
}