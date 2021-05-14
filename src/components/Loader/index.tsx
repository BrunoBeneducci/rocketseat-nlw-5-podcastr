import { useEffect } from 'react';
import { useLoader } from '../../context/LoaderContext';
import styles from './styles.module.scss';

export default function Loader() {

    const { statusLoader } = useLoader();

    return (
        <div className={statusLoader ? styles.loader + ' ' + styles.active : styles.loader}>
            Carregando...
        </div>
    );
}