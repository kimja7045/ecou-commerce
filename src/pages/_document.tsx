import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

const SITE_NAME = '에커머스'
const SITE_TITLE = '에커머스'
const SITE_DESCRIPTION = '에커머스'
// const SITE_IMAGE = '/images/metaThumbnail.png'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  redirectIEtoEdge() {
    return {
      __html: `
      if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.location = 'microsoft-edge:' + window.location;
        setTimeout(function() {
          window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
        }, 1);
      }`,
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script dangerouslySetInnerHTML={this.redirectIEtoEdge()} />

          {/* SEO */}
          {/*<link rel="apple-touch-icon" href="/icons/120.png" />*/}
          <link rel="apple-touch-icon" href="/vercel.svg" />
          {/*<link rel="apple-touch-icon" sizes="152x152" href="/icons/152.png" />*/}
          {/*<link rel="apple-touch-icon" sizes="180x180" href="/icons/180.png" />*/}
          {/*<link rel="apple-touch-icon" sizes="167x167" href="/icons/167.png" />*/}
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <link rel="canonical" href="https://ecou-commerce.vercel.app/" />
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          {/*<meta property="og:image" content={SITE_IMAGE} />*/}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={SITE_NAME} />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          {/*<meta property="twitter:image" content={SITE_IMAGE} />*/}
          <meta
            name="format-detection"
            content="telephone=no, address=no, email=no"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
