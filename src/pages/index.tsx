import Head from 'next/head';
import styles from '../styles/home.module.scss';
import Image from 'next/image';
import techsImage from '../../public/images/techs.svg';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

interface ContentProps {
  content: Content
}

interface Content {
  title: string,
  titleContent: string,
  linkAction: string,    
  mobileTitle: string, 
  mobileContent: string,
  mobileBanner: string,
  webTitle: string,
  webContent: string,
  webBanner: string
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Complete Website | Início</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
              <button>
                Iniciar agora!
              </button>
            </a>
          </section>

          <img src="/images/web-development.png" alt="Conteúdos do Website" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img src={content.mobileBanner} alt="Conteúdos desenvolvimento de apps" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src={content.webBanner} alt="Conteúdos desenvolvimento de aplicacoes web" />

          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image quality={100} src={techsImage} alt="Tecnologias" />
          <h2>Mais de <span className={styles.alunos}>150 empresas</span> já elevaram seus negócios ao próximo nivel.</h2>
          <span>Não perca a chance de evoluir de uma vez por todas?</span>
          <a href={content.linkAction}>
            <button>Acessar agora!</button>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query([
    Prismic.predicates.at("document.type", "home")
  ])

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_banner,
    title_web, web_content, web_banner    
  } = res.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,    
    mobileTitle: RichText.asText(mobile), 
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  };

  return {
    props:{
      content
    },
    revalidate: 60 * 2 // Update a cada 2 minutos
  }
}
