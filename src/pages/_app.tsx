import '../styles/global.scss';

import Header from '../components/Header';
import Player from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContextProvider } from '../context/PlayerContext';
import { ThemeContextProvider } from '../context/ThemeContext';
import { LoaderContextProvider } from '../context/LoaderContext';
import { FavoriteContextProvider } from '../context/FavoriteContext';

function MyApp({ Component, pageProps }) {

  return (
    <LoaderContextProvider>
      <ThemeContextProvider>
        <PlayerContextProvider>
          <FavoriteContextProvider>
            <div className={styles.wrapper}>
                <main>
                  <Header/>
                  <Component {...pageProps} />
                </main>

                {/* <button onClick={toggleDarkMode}>
                  Toggle Dark Mode
                </button> */}

                <Player />
              </div>
          </FavoriteContextProvider>
        </PlayerContextProvider>
      </ThemeContextProvider>
    </LoaderContextProvider>
  )

}

export default MyApp
