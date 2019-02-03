import React from 'react';

export const topNavMenuConfig = () => {
    return ({
        menuItems: [
            { menuName: 'home' },
            { menuName: 'stuff' },
            {
                menuName: 'link',
                a: (<a href='/'>{'link'}</a>),
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