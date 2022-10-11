import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Treinando React</h5>
      <p className={styles.p}>Mini Blog &copy; 2022</p>
    </footer>
  )
}

export default Footer