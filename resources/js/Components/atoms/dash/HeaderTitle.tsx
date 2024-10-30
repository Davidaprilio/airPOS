export default function HeaderTitle(props: {
    supTitle?: string | JSX.Element
    title: string | JSX.Element
    desc?: string | JSX.Element
}) {
    return (
        <>
            {props.supTitle && <h4 className='text-sm text-gray-800 font-normal'>{props.supTitle}</h4>}
            <h1 className='text-3xl text-gray-900 font-medium'>{props.title}</h1>
            {props.desc && <p className='text-md text-gray-700'>{props.desc}</p>}
        </>
    )
}