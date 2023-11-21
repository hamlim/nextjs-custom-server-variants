import '../app/globals.css'

export default function LegacyPage() {
  return <main><p>This is a legacy <code>`/pages`</code> route on Next 13!</p></main>
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}
