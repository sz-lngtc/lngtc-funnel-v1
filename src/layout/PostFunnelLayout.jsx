import { Outlet } from 'react-router-dom'
import styles from './PostFunnelLayout.module.css'

export function PostFunnelLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
