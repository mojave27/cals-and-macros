import React from 'react';
import { Link } from "@reach/router";

export const topNavMenuConfig = () => {
    return ({
        menuItems: [
            { menuName: 'home' },
            { menuName: 'link',
                link: (<Link to='/'>{'link'}</Link>),
            },
            { menuName: 'stuff' },
            {
                menuName: 'link',
                link: (<a href='/'>{'a-tag'}</a>),
            },
            {
                menuName: 'calc',
                dropDownItems: [
                    { text: 'Link 1' },
                    { text: 'Link 2' },
                    { a: <a href='/'>Link 3</a> },
                    // { link: <Link to='/' />}
                ]
            }
        ]
    })
}