import Card from './components/Card/Card'

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <section className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-sm uppercase tracking-tight font-mono">[ Member Unto Belagak ]</h1>
          <p className="text-xs mt-2 font-mono">geser ke kiri atau kanan untuk melihat nama lainnya</p>
        </div>
        
        <Card />
      </section>
    </main>
  );
}
