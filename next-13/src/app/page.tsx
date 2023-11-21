import Link from "next/link";


export default function Home() {
  return (
    <main>
      Next 13!
      <Link href="/legacy-page">Go to legacy pages route</Link>
    </main>
  )
}
