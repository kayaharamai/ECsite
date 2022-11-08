import Link from 'next/link';
import styles from '../styles/breadcrumb.module.css';


 export const Breadcrumb = ({lists}:any) => {

    return (
        <ul className={`${styles.lists}`}>
            {lists.map(({name,path}:any,index:any) => (
            <li key={index}>
                {lists.length - 1 !== index ? (
            <Link href={path}><a className={`${styles.link}`}>{name}&nbsp;&nbsp;</a></Link>
            ) : (<span className={`${styles.border}`}>{name}</span>
                )}
            </li>
            )
        )}
        </ul>
    )}
