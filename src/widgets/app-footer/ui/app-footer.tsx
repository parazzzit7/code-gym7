import styles from "./app-footer.module.scss";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        Code Gym · Подготовка к собеседованиям
      </div>
    </footer>
  );
}