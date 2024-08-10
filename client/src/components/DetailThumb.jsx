

export default function DetailsThumb({images, setIndex}) {
    return (
        <div className="thumb">
            {
                images.map((img, index)=>(
                    <img src={img} alt="https://www.beforethehighstreet.com/cdn/shop/products/e2a13eb7-ec60-4e5a-afa5-38fd2dbe9975.png?v=1654716027&width=1020" key={index} 
                    onClick={() => setIndex(index)} />
                ))
            }
        </div>
    )
}
