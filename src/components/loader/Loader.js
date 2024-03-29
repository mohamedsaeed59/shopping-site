import styles from "./loader.module.scss";
import LoaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={LoaderImg} alt="Loading" />
      </div>    
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;