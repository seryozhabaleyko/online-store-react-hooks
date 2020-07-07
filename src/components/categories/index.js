import React from 'react';
import { NavLink } from 'react-router-dom';

import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { getCategories } from '../../selectors';

import './style.scss';

const Categories = () => {
    const categories = useShallowEqualSelector((state) => getCategories(state));

    return (
        <section className='categories'>
            <h4>Brand</h4>
            <nav>
                <NavLink to='/' exact>All</NavLink>
                {categories.map((category, index) => (
                    <NavLink to={`/categories/${category.id}`} key={index}>
                        {category.name}
                    </NavLink>
                ))}
            </nav>
        </section>
    );
};

export default Categories;