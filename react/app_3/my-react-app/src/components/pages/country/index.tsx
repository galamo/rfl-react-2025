import { useParams } from 'react-router-dom';

export function CountryPage() {
    const { countryId } = useParams();
    return <div>Country {countryId}</div>
}