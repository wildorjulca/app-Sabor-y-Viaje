import { BackendError, getRegiones } from '@/api/services/regionesService';
import { RegionType } from '@/interface/regiones';
import { useState, useEffect } from 'react';

export const useRegiones = () => {
    const [data, setData] = useState<RegionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<BackendError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRegiones();
                if (response.data) {
                    setData(response.data);
                }
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(err as BackendError);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};