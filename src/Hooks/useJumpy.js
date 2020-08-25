import { useState } from 'react'

const useJumpy = () => {
    const [isJumpy, setIsJumpy] = useState(false)

    const jumpy = isJumpy ? "jump" : ""

    const toggleJumpy = () => {
        setIsJumpy(true)
        setTimeout(() => {
            setIsJumpy(false)
        }, 500)
    }

    return [jumpy, toggleJumpy]
}

export default useJumpy
