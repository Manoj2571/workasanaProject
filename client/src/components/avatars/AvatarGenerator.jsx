

const AvatarGenerator = ({people, num, size}) => {

    const avatarArr = people.reduce((acc, curr, index) => {
        acc = index < num ? [...acc, curr.name.charAt(0)] : index == num ? [...acc, `+${people.length - num}`] : acc

        return acc
    }, [])

    const randomColorGenerator = () => {
        const R = Math.floor(Math.random() * 255)
        const G = Math.floor(Math.random() * 255)
        const B = Math.floor(Math.random() * 255)

        return `rgb(${R}, ${G}, ${B})`
    }

    return (
        <div className="d-flex ms-2 my-2">
        {avatarArr?.map((person, index) => <div key={index} className="rounded-circle fw-medium border small border-white d-flex justify-content-center align-items-center text-white" 
        style={{width: `${size}px`, height: `${size}px`, marginLeft: "-10px", backgroundColor: randomColorGenerator()}}>
            {person}
        </div>)}
        {people?.length == 1 && <span className="ms-2 mt-1 text-body">{people[0].name}</span>}
        </div>
    )
}

export default AvatarGenerator