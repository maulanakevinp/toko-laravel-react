import React from 'react'
import Skeleton from 'react-loading-skeleton';

function CardProdukSkeleton() {
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow h-100">
                <div className="card-body">
                    <h3><Skeleton width={200} height={21} duration={0.5} /></h3>
                    <small><Skeleton width={100} height={21} duration={0.5} /></small>
                    <p className=""><Skeleton width={200} height={21} duration={0.5} /></p>
                    <div className="row">
                        <div className="col-5">
                            <Skeleton width={30} height={21} duration={0.5} />
                            <Skeleton width={30} height={21} duration={0.5} />
                        </div>
                        <div className="col-7 text-right">
                            <Skeleton width={100} height={21} duration={0.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProdukSkeleton
