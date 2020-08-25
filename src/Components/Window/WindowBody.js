import { useContext } from 'react'
import WindowContext from './Window'

const WindowBody = ({ children }) => {
    const { activeDisplay } = useContext(WindowContext)

    return (
        children[activeDisplay]
    )
}

export default WindowBody
