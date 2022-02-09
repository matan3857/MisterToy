import { ToyPreview } from './ToyPreview.jsx';
export function ToyList({ user, toys, onRemoveToy, onEditToy , onToyDetails}) {
    
    if (!toys.length) return <div>No toys to show...</div>

    return (
        <div className="toy-container">
            <ul className="toy-list">
                {toys.map(toy => <ToyPreview key={toy._id} user={user} toy={toy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} onToyDetails={onToyDetails}/>)}
            </ul>
        </div >
    )
}

