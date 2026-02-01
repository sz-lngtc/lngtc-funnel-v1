import { Link } from 'react-router-dom'
import styles from './WelcomePage.module.css'

export function WelcomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>Longetic</div>
        <p className={styles.tagline}>Превентивна медицина та довголіття</p>
        <h1 className={styles.title}>
          Дізнайтесь свій рівень енергії та Longevity Score
        </h1>
        <p className={styles.desc}>
          Коротка анкета з 26 питань у 6 блоках допоможе оцінити сон, харчування, рух, стрес, соціальне життя та здоров’я. Одна сторінка — одне питання.
        </p>
        <Link to="/q/0" className={styles.cta}>
          Почати
        </Link>
      </div>
    </div>
  )
}
