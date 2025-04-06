import { BackendError, getLugaresTuristicos } from "@/api/services/lugaresTuristicos"
import { LugaresTuristicoPorRegionType } from "@/interface/lugaresTuristicos"
import { useEffect, useState } from "react"


export const useLugaresTuristico = () => {
    const [data, setdata] = useState<LugaresTuristicoPorRegionType[]>([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState<BackendError | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLugaresTuristicos()
                if (response.data) {
                    setdata(response.data)
                }
                setloading(false)
            } catch (error) {
                seterror(error as BackendError)
            }
        }
        fetchData()

    }, [])

    return { dataTuristicos: data, errorTuristico: error, loadingTuristico: loading }
}