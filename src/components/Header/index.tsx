import format from 'date-fns/format';
import { useRouter } from 'next/router'
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext'
import { useFavorite } from '../../context/FavoriteContext';
import { useLoader } from '../../context/LoaderContext';
import Loader from '../../components/Loader';
import styles from './styles.module.scss';

import Modal from 'react-modal';

export default function Header() {
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    const { darkMode, toggleDarkMode } = useTheme();
    const { statusLoader, changeLoaderTrue, changeLoaderFalse } = useLoader();

    const { favoriteList, updateFavotireList, checkFavoriteItem } = useFavorite();
    const router = useRouter();

    useEffect(() => {
        if (statusLoader) {
            changeLoaderFalse();
        }
    }, [router]);

    return (
        <header className={styles.headerContainer}>
            <Loader/>
            <Link href="/">
                <img src={darkMode ? '/logo-white.svg' : '/logo.svg'} className={styles.logo} alt="Podcastr" onClick={changeLoaderTrue}/>
            </Link>
            <p>O melhor para você ouvir, sempre</p>
            <span>
                <div className={styles.favBtn} onClick={openModal}>
                    <img className={styles.favIcon} onClick={() => console.log('meus favoritos')} src="/fav-ok.svg" />
                    Meus favoritos
                </div>
                
                <div className={(styles.toogleTheme) + ' ' + (darkMode ? styles.darkTheme : '')} onClick={toggleDarkMode}>
                    <span></span>
                </div>

                <div className={styles.currentDate}>
                    {currentDate}
                </div>
            </span>

            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className={styles.Modal}
            overlayClassName={styles.ModalOverlay}
            contentLabel="Example Modal"
            ariaHideApp={false}
            >
                {/* <button onClick={closeModal}>close</button> */}
                <ul>
                    {favoriteList.length ? <h2>Episódios marcados como favoritos:</h2> : ''}
                    {favoriteList.length ?
                        favoriteList.map((episode, index) => {
                            return (
                                <React.Fragment key={episode.id}>
                                    <li className={styles.favList}>
                                        <img title={checkFavoriteItem(episode.id) ? 'Remover dos favoritos' : 'Marcar como favorito'} className={styles.favIcon} onClick={() => updateFavotireList(episode, episode.id)} src={checkFavoriteItem(episode.id) ? "/fav-ok.svg" : "/fav.svg"} />
                                        <Link href={`/episodes/${episode.id}`}>
                                            <span onClick={() => { changeLoaderTrue(); closeModal(); }}>{episode.title}</span>
                                        </Link>
                                    </li>
                                    <br/>
                                </React.Fragment>
                            )
                        })
                        :
                        <h2>Nenhum episódio marcado como favorito</h2>
                    }
                </ul>
                
            </Modal>
        </header>
    );
}