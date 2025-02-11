import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="title" content="Cátia Marina" />
        <meta name="description" content="Este website serve para marcares as tuas sessões e comprar as mesmas com facilidade! Este website pertence à Cátia Marina. Entra no website já!" />
        <meta name="keywords" content="coaching, catia marina, acompanhamento, progresso, orientação, mentorado, transformação" />
        <meta name="robots" content="index, nofollow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Portuguese" />
        <meta name="author" content="Tomás Moreira, Leandro Sampaio" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&family=Manrope:wght@700;800&family=Roboto+Flex:opsz,wght@8..144,800&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
