import styles from "./Header.module.css";
export const Header = () => {
  return (
    <div className={styles.containerHeader}>

      <div className={styles.containerTitleHeader}>
        <h1>Aplicación de tareas</h1>
      </div>
    </div>
  );
};
