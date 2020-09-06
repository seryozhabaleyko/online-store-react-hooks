import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Typography, Image, Badge, Card, Rate } from 'antd';

import { addToCart } from '../../actions/cart';

import styled from './product.module.scss';
import './ProductCard.scss';

const { Title } = Typography;

function ProductCard({ id, title, photoUrl, price = 0, rating = 4 }) {
    const dispatch = useDispatch();

    return (
        <Badge.Ribbon text="В наличии" placement="start">
            <div className="product-card">
                <div className={styled.image}>
                    <Link to={`/product/${id}`}>
                        <Image src={photoUrl} loading="lazy" alt={title} style={{ display: 'block' }} />
                    </Link>
                </div>

                <div className={styled.detail}>
                    <Title level={5} className={styled.title}>
                        {title}
                    </Title>
                    <div className={styled.price}>{`$${price.toLocaleString()}`}</div>

                    <Rate disabled defaultValue={rating} />

                    <button
                        type="button"
                        className={classNames('btn', 'btn-danger', styled.addToCart)}
                        onClick={() => dispatch(addToCart(id))}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Badge.Ribbon>
    );
}

export default ProductCard;