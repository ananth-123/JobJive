"use client"

async function getData() {
  const res = await fetch("http://localhost:3000/api/tts")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Page() {
  const blob = await getData()

  return (
    <main>
      <div>
        <h2>Audio player using binary data</h2>
      </div>
    </main>
  )
}
