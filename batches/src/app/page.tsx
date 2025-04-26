import { JsonDb } from "@/utils/jsonDb";

export default function Home() {
  const db = new JsonDb();

  // Fetch all startups from the JSON database
  const startups = db.getAll();

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Startups 🚀</h1>
        <p className="mt-4 text-lg text-gray-700">Liste des startups :</p>
        <ul className="mt-6 text-sm text-gray-600">
          {startups.map((startup, index) => (
            <li key={index} className="mb-6 w-full max-w-3xl bg-white p-4 rounded shadow">
              <strong>Startup:</strong> {startup.Startup || "N/A"} <br />
              <strong>Inception Year:</strong> {startup.inception_year || "N/A"} <br />
              {startup.lien_founder_1 ? (
                <a
                  href={startup.lien_founder_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Profile
                </a>
              ) : (
                "N/A"
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
