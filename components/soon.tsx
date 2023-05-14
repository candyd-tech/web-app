const ComingSoon = ({title, content}: {title: string; content: string}) => {
  return (
    <div className="px-4 pt-12 h-full flex flex-col
    gap-8 justify-center items-center">
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-center">{content}</p>
    </div>
  )
}

export default ComingSoon;
