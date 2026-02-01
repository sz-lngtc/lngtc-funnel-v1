import { useNavigate } from 'react-router-dom'
import { VALUE_BLOCKS } from '../../data/postFunnel'
import styles from './PostShared.module.css'

export function PostValuePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>With Longetic you get</h1>
      <ul className={styles.valueList}>
        {VALUE_BLOCKS.map((block, i) => (
          <li key={i} className={styles.valueBlock}>
            <h2 className={styles.valueTitle}>{block.title}</h2>
            <p className={styles.valueDesc}>{block.description}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.ctaPrimary}
        onClick={() => navigate('/post/ready', { replace: true })}
      >
        Continue
      </button>
    </div>
  )
}
