import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { api } from '../../services/api';
import { usePlayer } from '../../context/PlayerContext';
import { useFavorite } from '../../context/FavoriteContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {

    const { play, clickPlay } = usePlayer();
    const { favoriteList, updateFavotireList, checkFavoriteItem } = useFavorite();
    
    return (
        <div className={styles.episode}>
            <Head>
                <title>{episode.title} | Podcastr</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>

            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button" title="Voltar para home">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>
                <img src={episode.thumbnail} alt={episode.title} className={styles.thumbnailContainerImg}/>
                <button type="button" onClick={() => play(episode)} title="Tocar episódio">
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title} <img title={checkFavoriteItem(episode.id) ? 'Remover dos favoritos' : 'Marcar como favorito'} className={styles.favIcon} onClick={() => updateFavotireList(episode, episode.id)} src={checkFavoriteItem(episode.id) ? "/fav-ok.svg" : "/fav.svg"} /></h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>

    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // nesse path posso marcar os slugs/paginas que desejo gerar estaticamente
        paths: [],
        // fallback blocking é a legal para SEO, pois é renderizado no server do Next
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, //24 hours
    }
}