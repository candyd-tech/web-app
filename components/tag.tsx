import styles from '@/styles/imageView.module.scss'

const Tag = ({tag}: {tag: string}) => {
  return (
    <div className={`${styles.tag} text-xs`}>
      <p>{`#${tag}`}</p>
    </div>
  )
}

export default Tag;
