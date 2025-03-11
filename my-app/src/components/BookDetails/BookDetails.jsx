import { useSelector } from "react-redux"

export default function BookDetails() {
    const {data , isLoading , error} = useSelector(store=>store.getBook);
    return (
        <div className="w-1/2 text-start border-s-1 ps-2">
            <h2 className="text-2xl text-center mb-3">Book Details</h2>
            {isLoading ? <h2>Loading...</h2>:""}
            {error ? <h2>{error}</h2>:""}
            {console.log(data)}
            
            {Object.keys(data).length > 0 ? <div key={data.id}>
                <section className="mb-3">
                    <strong>Title: </strong> <span>{data.title}</span>
                </section>
                <section className="mb-3">
                    <strong>Price: </strong> <span>${data.price}</span>
                </section>
                <section className="mb-3">
                    <strong>description: </strong> <span>{data.desc}</span>
                </section>
            </div> : <div className="bg-gray-400 p-3">There is no book selected yet</div>}
        </div>
    )
}
