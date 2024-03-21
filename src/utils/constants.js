import {ROUTES} from "./routes.js";

import cabbage from '../assets/images/cabbage.png'
import cucumber from '../assets/images/cucumber.png'
import onion from '../assets/images/onion.png'
import parsley from '../assets/images/parsley.png'
import potatoes from '../assets/images/potatoes.png'
import tomatoes from '../assets/images/tomatoes.png'

import onboarding1 from '../assets/images/onboarding1.png';
import onboarding2 from '../assets/images/onboarding2.png';
import onboarding3 from '../assets/images/onboarding3.png';
import onboarding4 from '../assets/images/onboarding4.png';
import onboarding5 from '../assets/images/onboarding5.png';

import usersIcon from "../assets/images/users.png";
import betIcon from "../assets/images/bet.png";
import accountIcon from "../assets/images/account.png";
import advIcon from "../assets/images/advertisements.png";
import ordersIcon from "../assets/images/orders.png";

import betsIcon from "../assets/images/notifications/betIcon.png";
import currencyIcon from "../assets/images/notifications/currencyIcon.png";
import moderationIcon from "../assets/images/notifications/moderationIcon.png";
import orangeModerationIcon from "../assets/images/notifications/orangeModerationIcon.png";
import outbittedIcon from "../assets/images/notifications/outbittedIcon.png";

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

export const onboardingStuff = [
    {
        id: 1,
        slide: `${onboarding1}`,
        title: 'Welcome!',
        text: 'Agroex - agricultural trade market in Uzbekistan',
    },
    {
        id: 2,
        slide: `${onboarding2}`,
        title: '4 product categories',
        text: 'A wide range of products from cucumbers to almonds',
    },
    {
        id: 3,
        slide: `${onboarding3}`,
        title: 'Catalog ads',
        text: 'Buy and sell your products through the catalog',
    },
    {
        id: 4,
        slide: `${onboarding4}`,
        title: 'Convenient search',
        text: 'Flexible setting of filters to find the necessary products',
    },
    {
        id: 5,
        slide: `${onboarding5}`,
        title: 'Payment and shipment',
        text: 'Support and consult at the final stages of the transaction',
    },
]

export const adminNav = [
    {
        title: 'All Users',
        icon: `${usersIcon}`,
        path: ROUTES.ADMINUSERS,
    },
    {
        title: 'All Bets',
        icon: `${betIcon}`,
        path: ROUTES.ADMINBETS,
    },
    {
        title: 'My account',
        icon: `${accountIcon}`,
        path: ROUTES.ADMINACCOUNT,
    },
]

export const userNav = [
    {
        title: 'My advertisements',
        icon: `${advIcon}`,
        path: ROUTES.ADVERTISEMENT,
    },
    {
        title: 'Betting',
        icon: `${betIcon}`,
        path: ROUTES.BETS,
    },
    {
        title: 'My orders',
        icon: `${ordersIcon}`,
        path: ROUTES.ORDERS,
    },
    {
        title: 'My account',
        icon: `${accountIcon}`,
        path: ROUTES.ACCOUNT,
    },
]

export const exchangerNav = [
    {
        title: 'Advertisements',
        icon: `${advIcon}`,
        path: ROUTES.ADVERTISEMENT,
    },
    {
        title: 'All bets',
        icon: `${betIcon}`,
        path: ROUTES.BETS,
    },
    {
        title: 'My account',
        icon: `${accountIcon}`,
        path: ROUTES.ACCOUNT,
    },
]

export const notifications = [
    {
        title: 'Outbitted lot',
        description: `Your bet on LOT XXX
was outbid.`,
        type: 'Outbitted lot',
        img: `${outbittedIcon}`,
    },
    {
        title: 'Purchased lot',
        description: `Your Lot XXX has been purchased at the original price.
Proceed to confirm.`,
        type: 'Purchased lot',
        img: `${currencyIcon}`,
    },
    {
        title: 'New bet',
        description: `A new bet has been placed on your Lot XXX.`,
        type: 'New bet',
        img: `${betsIcon}`,
    },
    {
        title: 'Confirmed bet request',
        description: `Your bet on Lot XXX has been confirmed.`,
        type: 'Confirmed bet request',
        img: `${currencyIcon}`,
    },
    {
        title: 'Moderation is successful',
        description: `Your Lot XXX has been moderated and has already been published.`,
        type: 'Moderation is successful',
        img: `${moderationIcon}`,
    },
    {
        title: 'Moderation is unsuccessful',
        description: `Your lot XXX was not moderated and rejected.`,
        type: 'Moderation is unsuccessful',
        img: `${orangeModerationIcon}`,
    }
]