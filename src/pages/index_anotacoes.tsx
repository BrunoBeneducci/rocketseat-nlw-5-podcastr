import { useEffect } from 'react';

export default function Home(props) {
  // SPA
  // carregados somente ao entrar em tela. é um problema de SEO
  useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(data => console.log('SPA', data))
  }, []);

  // SSR - as requisicoes precisam estar dentro disso:
  // export function gerServerSideProps () {}

  return (
    <div>
      <h1>header</h1>

      {/* SSR / SSG */}
      <p>{JSON.stringify(props.episodes)}</p>


    </div>
  )
}

// SSR
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// }

// SSG
// aqui foi config no revalidate, de gerar uma nova versao do site, a partir de 8h
// isso é mto bom em questao de performance
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 80,
  }
}