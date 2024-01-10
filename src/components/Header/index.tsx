
import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/Logo_Long.png';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a>
          <Image src={logo} alt="Website Logo" width={250} />
        </a>

        <nav>
          <ActiveLink legacyBehavior href="/" activeClassName={styles.active}>
            <a>Início</a>
          </ActiveLink>
          <ActiveLink legacyBehavior href="/conteudos" activeClassName={styles.active}>
            <a>Conteúdos</a>
          </ActiveLink>
          <ActiveLink legacyBehavior href="/sobre" activeClassName={styles.active}>
            <a>Sobre</a>
          </ActiveLink>
        </nav>

        <a className={styles.readyButton} type="button" href="https://github.com/alexrossoni">Iniciar</a>
      </div>
    </header>
  )
}