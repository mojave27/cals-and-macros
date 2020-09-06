
export const menuConfig = 
    [
        { name: 'calcs',
            items: [
                { to: 'food-search', text: 'foods' },
                { to: 'meal', text: 'meal' },
            ]
         },
        { name: 'view',
            items: [
                // { to: 'food-search', text: 'foods' },
                { to: 'meals', text: 'meals' }
            ]
         },
        { name: 'manage',
            items: [
                { to: 'manage-foods-db', text: 'foods db' },
                { to: 'manage-meals-db', text: 'meals db' }
            ]
         }
    ];