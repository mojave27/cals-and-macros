import React from 'react';
import { Link } from "@reach/router";

export const topNavMenuConfig = () => {
    return ({
        menuItems: [
            { menuName: 'home' },
            { menuName: 'link',
                link: (<Link to='/'>{'link'}</Link>),
            },
            { 
                menuName: 'stuff',
                dropDownItems: [
                    { text: 'plain-text' },
                    { link: <a href='/'>{'a-tag'}</a> },
                    { link: (<Link to='/'>{'link'}</Link>)},
                ]
            },
            {
                menuName: 'link',
                link: (<a href='/'>{'a-tag'}</a>),
            },
            {
                menuName: 'calc',
                dropDownItems: [
                    { text: 'Link 1' },
                    { link: <a href='form'>form</a> },
                    { link: <a href='/'>Link 3</a> },
                ]
            }
        ]
    })
}