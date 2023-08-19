import axios from "axios"
import { useEffect, useState } from "react"

export const Cell = ({ i, className, type, content, task, obj, setExtendedList }) => {
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (obj !== undefined) {
            obj.completed_days.includes(i) ? setStatus(true) : setStatus(false)

        }
    }, [])

    const ChangeDone = async () => {
        if (type === 'cell') {
            console.log(status)

            if (!status) {
                try {
                    const response = await axios.put(`/content/daily/mark-completed/${localStorage.getItem('userId')}`, {
                        data: { name: task, day: i }
                    })

                    setStatus(response.status === 200 ? true : false)
                    console.log(response.status)
                    console.log(status)
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const response = await axios.put(`/content/daily/mark-not-completed/${localStorage.getItem('userId')}`, {
                        data: { name: task, day: i }
                    })
                    setStatus(response.status === 200 ? false : true)
                    console.log(response.status)
                    console.log(status)

                } catch (error) {
                    console.log(error)
                }
            }



        }
    }



    return (
        <div key={`${type}${i}`} className={className} onClick={ChangeDone}>
            {content}
            {type === 'cell' && status ? 'X' : ''}
        </div>
    )
}

// || type === 'cell' && status ? 'X' : ''