export const BASE_URL = 'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api';

import cabbage from '../assets/images/cabbage.png'
import cucumber from '../assets/images/cucumber.png'
import onion from '../assets/images/onion.png'
import parsley from '../assets/images/parsley.png'
import potatoes from '../assets/images/potatoes.png'
import tomatoes from '../assets/images/tomatoes.png'

export const subCategories = [
    {
        id: 1,
        name: 'Cabbage',
        category: 'Vegetables',
        url: `${cabbage}`,
    },
    {
        id: 2,
        name: 'Cucumber',
        category: 'Vegetables',
        url: `${cucumber}`,
    },
    {
        id: 3,
        name: 'Onion',
        category: 'Vegetables',
        url: `${onion}`,
    },
    {
        id: 4,
        name: 'Parsley',
        category: 'Vegetables',
        url: `${parsley}`,
    },
    {
        id: 5,
        name: 'Potatoes',
        category: 'Vegetables',
        url: `${potatoes}`,
    },
    {
        id: 6,
        name: 'Tomatoes',
        category: 'Vegetables',
        url: `${tomatoes}`,
    },
    {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        url: '../assets/images/apples.png',
    },
    {
        id: 2,
        name: 'Apricots',
        category: 'Fruits',
        url: '../assets/images/apricots.png',
    },
]
